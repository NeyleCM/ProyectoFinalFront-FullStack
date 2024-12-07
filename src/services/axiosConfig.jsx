import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://proyectofinal-fullstackdev.onrender.com/api", // URL base de tu API
  //headers: {
    //"Content-Type": "application/json", // Tipo de contenido
  //},
});

export default axiosConfig;