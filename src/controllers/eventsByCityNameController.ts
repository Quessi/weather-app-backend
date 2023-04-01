import { Request, Response } from "express";
import searchCity from "../services/searchCity";
import { ICityData, IParams, categoryType } from "../types";
import eventsAPI from "../services/ThirdParty/Events/eventsAPI";
import filterNull from "../utils/filterNull";

export default async (req: Request, res: Response) => {
  const cityName = safeConvertToLowerCase(req.query.city as string);
  const country = safeConvertToUpperCase(req.query.country as string);
  const radius = safeConvertToLowerCase(req.query.radius as string)
  const category = safeConvertToLowerCase(req.query.category as string) as categoryType;
  let citiData: ICityData | undefined;
  try {
    const result: ICityData[] = (await searchCity(cityName)) as ICityData[];
    citiData = country ?result.find(
      (city: ICityData) => city.country.toUpperCase() === country
    ):result[0];
  } catch (error) {
    return res.status(200).json({ message: "City not found", data: [] });
  }
  if (!citiData) {
    return res.status(200).json({ message: "City not found", data: [] });
  }
  try {
    const within = formatCoordinates({
      latitude: +citiData?.lat,
      longitude: +citiData?.lng,
      radius,
    });

    const params: IParams = filterNull( {
      country,
      within,
      category,
      offset:100
    });
    console.log(params)
    const response = await eventsAPI(params);
    return res.status(200).json({ message: "success", data: response });
  } catch (error) {
    return res.status(500).json({ message: "failure", data: [] });
  }
};

function formatCoordinates({
  latitude,
  longitude,
  radius,
}: {
  latitude: number;
  longitude: number;
  radius: string;
}) {
  if (!(latitude && longitude)) return "";
  return `${radius ? radius + "km" : 12 + "km"}@${latitude},${longitude}`;
}

function safeConvertToUpperCase(str: string) {
  return str ? str.toUpperCase() : "";
}
function safeConvertToLowerCase(str: string) {
  return str ? str.toLowerCase() : "";
}

