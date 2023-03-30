import express from "express";
import fetchData from "../utils/fetchWeatherData";
import { getCityData } from "../utils/getCityData";
import redisClient from "../utils/redisClient";
import searchCity from "../utils/searchCity";
import { ICityData } from "../types";
import redisService from "../services/redisService";

const router = express.Router();

router.get("/coordinates", async (req, res) => {
  const latitude = req.query.lat as unknown as number;
  const longitude = req.query.lon as unknown as number;
  const data = { latitude, longitude };

  //confirm that latitude and longitude are valid,reject request if not
  if (!(data.latitude && data.longitude)) {
    return res.status(400).json({ message: "Invalid Request Location" });
  }
  //construct redis key from latitude and longitude
  const redisKey = latitude.toString().concat(longitude.toString());

  //check redis cache for data,send response if data
  try {
    const redisData = await redisClient.get(redisKey);
    if (!!redisData) {
      return res
        .status(200)
        .json({
          message: "success",
          fromCache: true,
          data: JSON.parse(redisData),
        });
    }
  } catch (error) {
    console.log(error);
  }

  //fetch data from weather api
  let result: any;
  try {
    result = await fetchData(data);
  } catch (error) {
    return res.status(502).json({ message: "server network error", code: 502 });
  }

  //save data to redis cache and fulfill client request
  try {
    await redisClient.set(redisKey, JSON.stringify(result));
    await redisClient.expire(redisKey, 6 * 60 * 60);
  } catch (error) {
    console.log(error);
  }
  return res
    .status(200)
    .json({ message: "success", fromCache: "false", data: result });
});

router.get("/city", async (req, res) => {
  let fromCache = false;
  let results;
  const cityName = (req.query.name as string).toLowerCase();
  let cacheResults;
  let citiData: ICityData;
  let redisCityKey: string;

  //Search JSON for city data, reject reques if not found
  try {
    citiData = (await getCityData(cityName)) as ICityData;
  } catch (error) {
    return res.status(404).json({ message: "Unknown City" });
  }

  //Check redis cache for city data
  try {
    redisCityKey = citiData.country.concat(citiData.name).toLocaleLowerCase();
    cacheResults = await redisClient.get(redisCityKey);
  } catch (error) {
    console.log(error);
  }

  //If data found in cache, request succeeds
  if (!!cacheResults) {
    fromCache = true;
    results = JSON.parse(cacheResults);
    return res
      .status(200)
      .json({ message: "success", fromCache, data: results });
  }

  //Request not found in cache, fetch data from API
  try {
    const data = { latitude: +citiData?.lat, longitude: +citiData?.lng };
    results = await fetchData(data);
  } catch (error) {
    return res.status(502).json({ message: "Server network error", code: 502 });
  }

  //Don't forget to update cache with API results before response is returned
  try {
    redisCityKey = citiData.country.concat(citiData.name).toLocaleLowerCase();
    await redisClient.set(redisCityKey, JSON.stringify(results));
    await redisClient.expire(redisCityKey, 6 * 60 * 60);
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json({ message: "success", fromCache, data: results });
});

router.get("/find-city", async (req, res) => {
  const cityName = (req.query.name as string).toLowerCase();
  try {
    const result = await searchCity(cityName);
    return res.status(200).json({ message: "success", data: result });
  } catch (error) {
    return res.status(200).json({ message: "City not found", data: [] });
  }
});

export default router;
