import axios from "axios";
console.log(process.env.API_REQUEST_URL)
export const makeRequestApi = axios.create({
    baseURL: process.env.API_REQUEST_URL,
  })