import cityArray from 'cities.json'
import { ICityData } from '../types';

export const getCityData = (name:string) =>{
    // let lowercaseStr = name.trim().toLowerCase().replace(/^(.)/, (match:string) => match.toUpperCase());

    const cityData:ICityData[] = cityArray as unknown as Array<ICityData>;
    return cityData.find(city => city.name.toLowerCase() === name.toLowerCase());

}

export const getCityNameFromCoordinates = ({lat,lng}:{lat:number,lng:number})=>{

    const cityData:ICityData[] = cityArray as unknown as Array<ICityData>;
    return cityData.find(city=>city.lat===lat as unknown as string && city.lng===lng as unknown as string)

}