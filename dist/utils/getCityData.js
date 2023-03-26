"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCityNameFromCoordinates = exports.getCityData = void 0;
const cities_json_1 = __importDefault(require("cities.json"));
const getCityData = (name) => {
    // let lowercaseStr = name.trim().toLowerCase().replace(/^(.)/, (match:string) => match.toUpperCase());
    const cityData = cities_json_1.default;
    return cityData.find(city => city.name.toLowerCase() === name.toLowerCase());
};
exports.getCityData = getCityData;
const getCityNameFromCoordinates = ({ lat, lng }) => {
    const cityData = cities_json_1.default;
    return cityData.find(city => city.lat === lat && city.lng === lng);
};
exports.getCityNameFromCoordinates = getCityNameFromCoordinates;
