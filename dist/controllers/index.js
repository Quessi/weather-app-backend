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
const express_1 = __importDefault(require("express"));
const fetchWeatherData_1 = __importDefault(require("../utils/fetchWeatherData"));
const getCityData_1 = require("../utils/getCityData");
const redisClient_1 = __importDefault(require("../utils/redisClient"));
const searchCity_1 = __importDefault(require("../utils/searchCity"));
const router = express_1.default.Router();
router.get("/coordinates", (req, res) => {
    const latitude = req.query.lat;
    const longitude = req.query.lon;
    const data = { latitude, longitude };
    if (!(data.latitude && data.longitude)) {
        return res.send(400).json({ message: "Invalid Request Location" });
    }
    const result = (0, fetchWeatherData_1.default)(data);
    res.status(200).json({ message: "success", data: result });
});
router.get("/city", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let fromCache = false;
    let results;
    const cityName = req.query.name.toLowerCase();
    const cacheResults = yield redisClient_1.default.get(cityName);
    if (!!cacheResults) {
        fromCache = true;
        results = JSON.parse(cacheResults);
        return res.status(200).json({ message: "success", fromCache, data: results });
    }
    const citiData = (0, getCityData_1.getCityData)(cityName);
    if (!((citiData === null || citiData === void 0 ? void 0 : citiData.lat) && (citiData === null || citiData === void 0 ? void 0 : citiData.lng))) {
        return res.status(404).json({ message: "city not found" });
    }
    const data = { latitude: +(citiData === null || citiData === void 0 ? void 0 : citiData.lat), longitude: +(citiData === null || citiData === void 0 ? void 0 : citiData.lng) };
    results = yield (0, fetchWeatherData_1.default)(data);
    yield redisClient_1.default.set(cityName, JSON.stringify(results));
    yield redisClient_1.default.expire(cityName, 24 * 60 * 60);
    return res.status(200).json({ message: "success", fromCache, data: results });
}));
router.get('/find-city', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cityName = req.query.name.toLowerCase();
    try {
        const result = yield (0, searchCity_1.default)(cityName);
        return res.status(200).json({ message: "success", data: result });
    }
    catch (error) {
        return res.status(200).json({ message: "City not found", data: [] });
    }
}));
exports.default = router;
