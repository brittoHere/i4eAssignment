import axios from "axios";
const apiUrl = "https://myfakeapi.com/api/cars/";

export function getCars() {
  return axios.get(apiUrl);
}
