import axios from 'axios';

enum UrlBase {
  weather = "http://api.openweathermap.org/",
  events = "https://api.predicthq.com/v1/",
}

export default (url?:string, headers?:any)=>{
    const baseURL = UrlBase[url as keyof typeof UrlBase] || UrlBase.weather;
    return axios.create({
    baseURL,
    headers
});
}