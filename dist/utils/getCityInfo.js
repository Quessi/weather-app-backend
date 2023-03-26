"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCityData = void 0;
const cities_json_1 = __importDefault(require("cities.json"));
const getCityData = () => {
    //  let formattedName = name.trim().toLowerCase().split('');
    //  formattedName[0] = formattedName[0].toUpperCase();
    //  const finalFormat = formattedName.join("");
    console.log(cities_json_1.default);
};
exports.getCityData = getCityData;
