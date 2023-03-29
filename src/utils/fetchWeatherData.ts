import API from "./API";
import { IAPI } from "../types";
const api_key = process.env.WEATHER_API_KEY;

const fetchData = async(endpoint:IAPI )=>{
    const {latitude,longitude} = endpoint || {};
    const response = await API.get(
        `data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${api_key}&units=metric`
    );
    return response?.data;

}

export default fetchData;
