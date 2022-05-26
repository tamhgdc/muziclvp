import axios from "axios";
import { SEARCH } from "../constants/api";

export default async function searchSong(endpoint, method = "get", data) {
  return await axios({
    method: method,
    url: SEARCH + endpoint,
    data: data,
  }).catch((err) => console.log(err));
}
