import { ICityData } from "../types";
import fetchData from "../services/ThirdParty/Weather/fetchWeatherData";
import { getCityData } from "../services/getCityData";
import redisClient from "../utils/redisClient";
import { Request, Response} from "express";


export default async (req: Request, res: Response) => {
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
    cacheResults = redisClient ? await redisClient.get(redisCityKey):"";
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
  if(redisClient){
    try {
      redisCityKey = citiData.country.concat(citiData.name).toLocaleLowerCase();
      await redisClient.set(redisCityKey, JSON.stringify(results));
      await redisClient.expire(redisCityKey, 6 * 60 * 60);
    } catch (error) {
      console.log(error);
    }
  }

  return res.status(200).json({ message: "success", fromCache, data: results });
};