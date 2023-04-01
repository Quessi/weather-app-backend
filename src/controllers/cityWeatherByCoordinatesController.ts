import fetchData from "../services/ThirdParty/Weather/fetchWeatherData";
import redisClient from "../utils/redisClient";
import { Request, Response} from "express";


export default async (req:Request, res:Response) => {
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
      const redisData = redisClient? await redisClient.get(redisKey):"";
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
    if( redisClient){
        try {
            await redisClient.set(redisKey, JSON.stringify(result));
            await redisClient.expire(redisKey, 6 * 60 * 60);
          } catch (error) {
            console.log(error);
          }
    }
  
    return res
      .status(200)
      .json({ message: "success", fromCache: "false", data: result });
  };