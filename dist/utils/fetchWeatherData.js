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
const API_1 = __importDefault(require("./API"));
const api_key = process.env.WEATHER_API_KEY;
const fetchData = (endpoint) => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude } = endpoint || {};
    const response = yield API_1.default.get(`data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${api_key}&units=metric`);
    return response === null || response === void 0 ? void 0 : response.data;
});
exports.default = fetchData;
