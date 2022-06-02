import axios from "axios";
import { LYRIC } from "../constants/api";

export default async function getLyric(endpoint, method = "get", data) {
  return await axios({
    method: method,
    url: LYRIC + endpoint,
    data: data,
  }).catch((err) => console.log(err));
}
