"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
var UrlBase;
(function (UrlBase) {
    UrlBase["weather"] = "http://api.openweathermap.org/";
    UrlBase["events"] = "https://api.predicthq.com/v1/";
})(UrlBase || (UrlBase = {}));
exports.default = (url, headers) => {
    const baseURL = UrlBase[url] || UrlBase.weather;
    return axios_1.default.create({
        baseURL,
        headers
    });
};
