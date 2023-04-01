"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CountryCodes_json_1 = __importDefault(require("./CountryCodes.json"));
exports.default = (countryCode) => {
    const country = CountryCodes_json_1.default === null || CountryCodes_json_1.default === void 0 ? void 0 : CountryCodes_json_1.default[countryCode];
    if (!country) {
        throw new Error('Invalid country code');
    }
};
