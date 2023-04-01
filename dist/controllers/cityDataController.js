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
const searchCity_1 = __importDefault(require("../services/searchCity"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cityName = req.query.name.toLowerCase();
    try {
        const result = yield (0, searchCity_1.default)(cityName);
        return res.status(200).json({ message: "success", data: result });
    }
    catch (error) {
        return res.status(200).json({ message: "City not found", data: [] });
    }
});
