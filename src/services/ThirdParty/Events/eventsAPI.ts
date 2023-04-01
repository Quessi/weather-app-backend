import { categoryType, deletedReasonType } from "../../../types";
import API from "../../../utils/API";
import "../../../utils/CountryCodes.json";

interface IState {
  active: string;
  deleted: string;
  predicted: string;
}

interface IParams {
  country?: string;
  id?: string;
  state?: IState;
  category?: categoryType;
  deleted_reason?: deletedReasonType;
  within?: string|undefined;

}
const headers = {
  Authorization: `Bearer ${process.env.EVENTS_API_KEY}`,
  Accept: "application/json",
};

export default async (params?: IParams) => {
  console.log(params)
    try {
        const response = await API("events", headers).get("/events", { params });
        return response?.data;
    } catch (error) {
      console.log(error)
        return error;
    }
  
};

