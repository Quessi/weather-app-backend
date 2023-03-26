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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const fetchWeatherData_1 = __importDefault(require("./utils/fetchWeatherData"));
const getCityData_1 = require("./utils/getCityData");
const redis_1 = __importDefault(require("redis"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
let redisClient;
(() => __awaiter(void 0, void 0, void 0, function* () {
    redisClient = redis_1.default.createClient();
    redisClient.on("error", (error) => console.error(`Error : ${error}`));
    yield redisClient.connect();
}))();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/coordinates", (req, res) => {
    const latitude = req.query.lat;
    const longitude = req.query.lon;
    const data = { latitude, longitude };
    if (!(data.latitude && data.longitude)) {
        return res.send(400).json({ message: "Invalid Request Location" });
    }
    const result = (0, fetchWeatherData_1.default)(data);
    res.status(200).json({ message: "success", data: result });
});
app.get("/city", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let fromCache = false;
    let results;
    const cityName = req.query.name.toLowerCase();
    const cacheResults = yield redisClient.get(cityName);
    if (!!cacheResults) {
        fromCache = true;
        results = JSON.parse(cacheResults);
        return res.status(200).json({ message: "success", data: results, fromCache });
    }
    const citiData = (0, getCityData_1.getCityData)(cityName);
    if (!((citiData === null || citiData === void 0 ? void 0 : citiData.lat) && (citiData === null || citiData === void 0 ? void 0 : citiData.lng))) {
        return res.status(404).json({ message: "city not found" });
    }
    const data = { latitude: +(citiData === null || citiData === void 0 ? void 0 : citiData.lat), longitude: +(citiData === null || citiData === void 0 ? void 0 : citiData.lng) };
    results = yield (0, fetchWeatherData_1.default)(data);
    yield redisClient.set(cityName, JSON.stringify(results));
    return res.status(200).json({ message: "success", data: results, fromCache });
}));
app.listen(PORT, () => {
    console.log("server is running", PORT);
});
