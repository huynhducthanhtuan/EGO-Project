import axios from "axios";

const BASE_URL = "http://localhost:4001";

const httpRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: ""
  }
});

export default httpRequest;
