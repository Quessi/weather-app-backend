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
const fetchWeatherData_1 = __importDefault(require("../utils/fetchWeatherData"));
const getCityData_1 = require("../utils/getCityData");
const redisClient_1 = __importDefault(require("../utils/redisClient"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let fromCache = false;
    let results;
    const cityName = req.query.name.toLowerCase();
    let cacheResults;
    let citiData;
    let redisCityKey;
    //Search JSON for city data, reject reques if not found
    try {
        citiData = (yield (0, getCityData_1.getCityData)(cityName));
    }
    catch (error) {
        return res.status(404).json({ message: "Unknown City" });
    }
    //Check redis cache for city data
    try {
        redisCityKey = citiData.country.concat(citiData.name).toLocaleLowerCase();
        cacheResults = yield redisClient_1.default.get(redisCityKey);
    }
    catch (error) {
        console.log(error);
    }
    //If data found in cache, request succeeds
    if (!!cacheResults) {
        fromCache = true;
        results = JSON.parse(cacheResults);
        return res
            .status(200)
            .json({ message: "success", fromCache, data: results });
    }
    //Request not found in cache, fetch data from API
    try {
        const data = { latitude: +(citiData === null || citiData === void 0 ? void 0 : citiData.lat), longitude: +(citiData === null || citiData === void 0 ? void 0 : citiData.lng) };
        results = yield (0, fetchWeatherData_1.default)(data);
    }
    catch (error) {
        return res.status(502).json({ message: "Server network error", code: 502 });
    }
    //Don't forget to update cache with API results before response is returned
    try {
        redisCityKey = citiData.country.concat(citiData.name).toLocaleLowerCase();
        yield redisClient_1.default.set(redisCityKey, JSON.stringify(results));
        yield redisClient_1.default.expire(redisCityKey, 6 * 60 * 60);
    }
    catch (error) {
        console.log(error);
    }
    return res.status(200).json({ message: "success", fromCache, data: results });
});
