import express from 'express';
import fetchData from "../utils/fetchWeatherData";
import { getCityData } from "../utils/getCityData";
import redisClient from "../utils/redisClient";
import searchCity from '../utils/searchCity';

const router = express.Router();

router.get("/coordinates", (req, res) => {
    const latitude = req.query.lat as unknown as number;
    const longitude = req.query.lon as unknown as number;
    const data = { latitude, longitude };
    if (!(data.latitude && data.longitude)) {
      return res.send(400).json({ message: "Invalid Request Location" });
    }
    const result = fetchData(data);
    res.status(200).json({ message: "success", data: result });
  });
  
router.get("/city", async (req, res) => {
    let fromCache = false;
    let results;
    const cityName = (req.query.name as string).toLowerCase();
    const cacheResults = await redisClient.get(cityName);
    if (!!cacheResults) {
      fromCache = true;
      results = JSON.parse(cacheResults);
      return res.status(200).json({ message: "success", fromCache, data: results });
    }
  
    const citiData = getCityData(cityName);
    if (!(citiData?.lat && citiData?.lng)) {
      return res.status(404).json({ message: "city not found" });
    }
  
    const data = { latitude: +citiData?.lat, longitude: +citiData?.lng };
    results = await fetchData(data);
    await redisClient.set(cityName, JSON.stringify(results));
    await redisClient.expire(cityName, 24*60*60);
    return res.status(200).json({ message: "success", fromCache, data: results });
  });

router.get('/find-city',async (req, res)=>{
    const cityName = (req.query.name as string).toLowerCase();
    try {
        const result = await searchCity(cityName);
        return res.status(200).json({ message: "success", data: result });
    } catch (error) {
        return res.status(200).json({ message: "City not found", data: [] });
    }
})

export default router;