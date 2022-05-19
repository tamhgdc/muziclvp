import axios from "axios";
import { API_CATEGORY } from "../constants/api";

export default async function getCategory(endpoint, method = "get", data) {
  return await axios({
    method: method,
    url: API_CATEGORY + endpoint,
    data: data,
  }).catch((err) => console.log(err));
}
