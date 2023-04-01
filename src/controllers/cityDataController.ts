import { Request, Response} from "express";
import searchCity from "../services/searchCity";


export default async(req:Request,res:Response) =>{
    const cityName = (req.query.name as string).toLowerCase();
    try {
      const result = await searchCity(cityName);
      return res.status(200).json({ message: "success", data: result });
    } catch (error) {
      return res.status(200).json({ message: "City not found", data: [] });
    }
  };
