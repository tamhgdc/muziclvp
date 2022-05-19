import { VIDEO_API } from "../constants/api";
import axios from "axios";

export default async function getVideoApi(endpoint, method = "get", data) {
  return await axios({
    method: method,
    url: VIDEO_API + endpoint,
    data: data,
  }).catch((err) => console.log(err));
}
