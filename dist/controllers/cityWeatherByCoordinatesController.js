"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetchWeatherData_1 = __importDefault(require("../services/ThirdParty/Weather/fetchWeatherData"));
const redisClient_1 = __importDefault(require("../utils/redisClient"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const latitude = req.query.lat;
    const longitude = req.query.lon;
    const data = { latitude, longitude };
    //confirm that latitude and longitude are valid,reject request if not
    if (!(data.latitude && data.longitude)) {
        return res.status(400).json({ message: "Invalid Request Location" });
    }
    //construct redis key from latitude and longitude
    const redisKey = latitude.toString().concat(longitude.toString());
    //check redis cache for data,send response if data
    try {
        const redisData = redisClient_1.default ? yield redisClient_1.default.get(redisKey) : "";
        if (!!redisData) {
            return res
                .status(200)
                .json({
                message: "success",
                fromCache: true,
                data: JSON.parse(redisData),
            });
        }
    }
    catch (error) {
        console.log(error);
    }
    //fetch data from weather api
    let result;
    try {
        result = yield (0, fetchWeatherData_1.default)(data);
    }
    catch (error) {
        return res.status(502).json({ message: "server network error", code: 502 });
    }
    //save data to redis cache and fulfill client request
    if (redisClient_1.default) {
        try {
            yield redisClient_1.default.set(redisKey, JSON.stringify(result));
            yield redisClient_1.default.expire(redisKey, 6 * 60 * 60);
        }
        catch (error) {
            console.log(error);
        }
    }
    return res
        .status(200)
        .json({ message: "success", fromCache: "false", data: result });
});
