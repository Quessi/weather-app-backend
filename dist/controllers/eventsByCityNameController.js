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
const eventsAPI_1 = __importDefault(require("../services/ThirdParty/Events/eventsAPI"));
const filterNull_1 = __importDefault(require("../utils/filterNull"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cityName = safeConvertToLowerCase(req.query.city);
    const country = safeConvertToUpperCase(req.query.country);
    const radius = safeConvertToLowerCase(req.query.radius);
    const category = safeConvertToLowerCase(req.query.category);
    let citiData;
    try {
        const result = (yield (0, searchCity_1.default)(cityName));
        citiData = country ? result.find((city) => city.country.toUpperCase() === country) : result[0];
    }
    catch (error) {
        return res.status(200).json({ message: "City not found", data: [] });
    }
    if (!citiData) {
        return res.status(200).json({ message: "City not found", data: [] });
    }
    try {
        const within = formatCoordinates({
            latitude: +(citiData === null || citiData === void 0 ? void 0 : citiData.lat),
            longitude: +(citiData === null || citiData === void 0 ? void 0 : citiData.lng),
            radius,
        });
        const params = (0, filterNull_1.default)({
            country,
            within,
            category,
            offset: 100
        });
        console.log(params);
        const response = yield (0, eventsAPI_1.default)(params);
        return res.status(200).json({ message: "success", data: response });
    }
    catch (error) {
        return res.status(500).json({ message: "failure", data: [] });
    }
});
function formatCoordinates({ latitude, longitude, radius, }) {
    if (!(latitude && longitude))
        return "";
    return `${radius ? radius + "km" : 12 + "km"}@${latitude},${longitude}`;
}
function safeConvertToUpperCase(str) {
    return str ? str.toUpperCase() : "";
}
function safeConvertToLowerCase(str) {
    return str ? str.toLowerCase() : "";
}
