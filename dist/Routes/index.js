"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cityWeatherByNameController_1 = __importDefault(require("../controllers/cityWeatherByNameController"));
const cityWeatherByCoordinatesController_1 = __importDefault(require("../controllers/cityWeatherByCoordinatesController"));
const cityDataController_1 = __importDefault(require("../controllers/cityDataController"));
const eventsByCityNameController_1 = __importDefault(require("../controllers/eventsByCityNameController"));
const indexRouter = express_1.default.Router();
indexRouter.get('/city', cityWeatherByNameController_1.default);
indexRouter.get('/coordinates', cityWeatherByCoordinatesController_1.default);
indexRouter.get('/find-city', cityDataController_1.default);
indexRouter.get('/events', eventsByCityNameController_1.default);
exports.default = indexRouter;
