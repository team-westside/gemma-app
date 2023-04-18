import axios from "axios";

const API_URL = "https://gemma-backend.vercel.app/api/v1";
// const API_URL = process.env.API_URL;
//
// const TOKEN = process.env.TOKEN;
const TOKEN = "$2a$12$b7FlZca/z.kGviWfJJid8ehSU1jhrDpaSY3UM7JQ/NEtFPotgHxZK";

// console.log(API_URL, TOKEN);

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `${TOKEN}`,
  },
});

export default instance;
