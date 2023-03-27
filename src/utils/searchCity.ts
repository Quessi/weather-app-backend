import cityArray from "cities.json";
import { ICityData } from "../types";

const searchCity = function (searchTerm: string) {
  const cityData: ICityData[] = cityArray as unknown as Array<ICityData>;
  return new Promise((resolve, reject) => {
    const filteredCityData = cityData.filter((city) =>
      city.name.slice(0,searchTerm?.length).toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredCityData.length > 0) {
      resolve(filteredCityData.sort((a,b)=>a.name.localeCompare(b.name)));
    } else {
      reject(new Error("No results found"));
    }
  });
};

export default searchCity;
