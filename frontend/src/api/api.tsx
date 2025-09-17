import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000/api/v1";
const API_KEY = process.env.REACT_APP_API_KEY || "devkey";

const client = axios.create({
  baseURL: API_BASE,
  headers: { "x-api-key": API_KEY }
});

export const search = (q: string, page=1, size=20, sort="volume:desc", country=null) =>
  client.get("/search", { params: { q, page, size, sort, country } }).then(r => r.data);
