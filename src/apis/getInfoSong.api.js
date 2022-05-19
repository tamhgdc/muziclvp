import axios from "axios";
import { API_INFO_SONG } from "../constants/api";

export default async function getInfoSong(endpoint, method = "get", data) {
  return await axios({
    method: method,
    url: API_INFO_SONG + endpoint,
    data: data,
  }).catch((err) => console.log(err));
}
