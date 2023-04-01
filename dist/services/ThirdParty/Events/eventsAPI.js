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
const API_1 = __importDefault(require("../../../utils/API"));
require("../../../utils/CountryCodes.json");
const headers = {
    Authorization: `Bearer ${process.env.EVENTS_API_KEY}`,
    Accept: "application/json",
};
exports.default = (params) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(params);
    try {
        const response = yield (0, API_1.default)("events", headers).get("/events", { params });
        return response === null || response === void 0 ? void 0 : response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
