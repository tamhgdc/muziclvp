import { MV_API } from "../constants/api";
import axios from "axios";

export default async function getMvApi(endpoint, method = "get", data) {
  return await axios({
    method: method,
    url: MV_API + endpoint,
    data: data,
  }).catch((err) => console.log(err));
}
