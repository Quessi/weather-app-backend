import express from "express";
import cityWeatherByNameController from "../controllers/cityWeatherByNameController";
import cityWeatherByCoordinatesController from "../controllers/cityWeatherByCoordinatesController";
import cityDataController from "../controllers/cityDataController";
import eventsByCityNameController from "../controllers/eventsByCityNameController";



const indexRouter = express.Router()

indexRouter.get('/city',cityWeatherByNameController)
indexRouter.get('/coordinates',cityWeatherByCoordinatesController)
indexRouter.get('/find-city',cityDataController)
indexRouter.get('/events',eventsByCityNameController)

export default indexRouter