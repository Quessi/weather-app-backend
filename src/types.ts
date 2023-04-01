export interface IAPI{
    latitude:number;
    longitude:number;
}
export interface ICityData{
    name:string;
    country:string;
    lat:string;
    lng:string;
}

export type categoryType =
  | "school-holidays"
  | "public-holidays"
  | "observances"
  | "politics"
  | "conferences"
  | "expos"
  | "concerts"
  | "sports"
  | "community"
  | "daylight-savings"
  | "airport-delays"
  | "severe-weather"
  | "disasters"
  | "terror"
  | "health-warnings"
  | "academic"

  export type deletedReasonType =
    | "cancelled"
    | "duplicate"
    | "invalid"
    | "postponed";


    interface IState {
      active: string;
      deleted: string;
      predicted: string;
    }

    export interface IParams {
      country?: string;
      id?: string;
      state?: IState;
      category?: categoryType;
      deleted_reason?: deletedReasonType;
      within?: string|undefined
    
    }