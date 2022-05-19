import axios from "axios";
import { PLAYLIST_API } from "../constants/api";

export default async function getCategory(endpoint, method = "get", data) {
  return await axios({
    method: method,
    url: PLAYLIST_API + endpoint,
    data: data,
  }).catch((err) => console.log(err));
}
