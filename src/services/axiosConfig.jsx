import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://proyectofinal-fullstackdev.onrender.com/api",
  headers: {
    "Content-Type": "application/json", 
  },
});

export default axiosConfig;