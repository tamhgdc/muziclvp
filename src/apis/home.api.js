import axios from "axios";
import { URL_API } from "../constants/api";

export default async function getHome(endpoint, method = "get", data) {
  return await axios({
    method: method,
    url: URL_API + endpoint,
    data: data,
  }).catch((err) => console.log(err));
}
