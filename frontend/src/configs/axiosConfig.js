import axios from "axios";

const NODE_ENV = process.env.NODE_ENV;
const DEVELOPMENT_URL = process.env.REACT_APP_DEVELOPMENT_URL;
const PRODUCTION_URL = process.env.REACT_APP_PRODUCTION_URL;
const BASE_URL = NODE_ENV === "production" ? PRODUCTION_URL : DEVELOPMENT_URL;

const httpRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: ""
  }
});

export default httpRequest;
