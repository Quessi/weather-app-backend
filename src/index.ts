import "dotenv/config";
import express from "express";
import fetchData from "./utils/fetchWeatherData";
import { getCityData } from "./utils/getCityData";
import redis from "redis";

const app = express();
const PORT = process.env.PORT || 4000;

let redisClient: any;
(async () => {
    redisClient = redis.createClient();

    redisClient.on("error", (error:any) => console.error(`Error : ${error}`));
  
    await redisClient.connect();
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/coordinates", (req, res) => {
  const latitude = req.query.lat as unknown as number;
  const longitude = req.query.lon as unknown as number;
  const data = { latitude, longitude };
  if (!(data.latitude && data.longitude)) {
    return res.send(400).json({ message: "Invalid Request Location" });
  }
  const result = fetchData(data);
  res.status(200).json({ message: "success", data: result });
});

app.get("/city", async (req, res) => {
  let fromCache = false;
  let results;
  const cityName = (req.query.name as string).toLowerCase();
  const cacheResults = await redisClient.get(cityName);
  if (!!cacheResults) {
    fromCache = true;
    results = JSON.parse(cacheResults);
    return res.status(200).json({ message: "success", data: results, fromCache });
  }

  const citiData = getCityData(cityName);
  if (!(citiData?.lat && citiData?.lng)) {
    return res.status(404).json({ message: "city not found" });
  }

  const data = { latitude: +citiData?.lat, longitude: +citiData?.lng };
  results = await fetchData(data);
  await redisClient.set(cityName, JSON.stringify(results));
  return res.status(200).json({ message: "success", data: results, fromCache });
});

app.listen(PORT, () => {
  console.log("server is running", PORT);
});
