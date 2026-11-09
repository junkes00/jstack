import HttpClient from "./httpClient.js";

const urlBase = process.env.DB_URL ?? "";

console.log("BaseURL", urlBase)

export const apiClient = new HttpClient(urlBase);
