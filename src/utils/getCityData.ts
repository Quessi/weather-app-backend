import cityArray from 'cities.json'
import { ICityData } from '../types';

export const getCityData = (name:string) =>{
    const cityData:ICityData[] = cityArray as unknown as Array<ICityData>;
    const result = cityData.find(city => city.name.trim().toLowerCase() === name.trim().toLowerCase()) ;


    return new Promise((resolve, reject) =>{
        if(result){
            resolve(result )
        }else{
            reject(new Error('City not found'))
        }


    })

}

export const getCityNameFromCoordinates = ({lat,lng}:{lat:number,lng:number})=>{

    const cityData:ICityData[] = cityArray as unknown as Array<ICityData>;
    return cityData.find(city=>city.lat===lat as unknown as string && city.lng===lng as unknown as string)

}