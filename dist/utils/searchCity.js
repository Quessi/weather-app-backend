"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cities_json_1 = __importDefault(require("cities.json"));
const searchCity = function (searchTerm) {
    const cityData = cities_json_1.default;
    return new Promise((resolve, reject) => {
        const filteredCityData = cityData.filter((city) => city.name.slice(0, searchTerm === null || searchTerm === void 0 ? void 0 : searchTerm.length).toLowerCase().includes(searchTerm.toLowerCase()));
        if (filteredCityData.length > 0) {
            resolve(filteredCityData.sort((a, b) => a.name.localeCompare(b.name)).slice(0, 10));
        }
        else {
            reject(new Error("No results found"));
        }
    });
};
exports.default = searchCity;
