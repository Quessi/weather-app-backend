import API from "./API";
import { IAPI } from "../types";
const api_key = process.env.WEATHER_API_KEY;

const fetchData = async(endpoint:IAPI )=>{
    const {latitude,longitude} = endpoint || {};
    const response = await API.get(
        `data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=acb89f62d3a00c0e0a641ca9c30a4c7a`
    );
    console.log(response.data);
    return response.data;

}

export default fetchData;
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=acb89f62d3a00c0e0a641ca9c30a4c7a