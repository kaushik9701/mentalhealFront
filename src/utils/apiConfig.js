// src/apiConfig.js
const BACKEND_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080"
    : "https://focus-backend.loca.lt";

export default BACKEND_URL;
