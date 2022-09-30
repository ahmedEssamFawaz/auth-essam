import axios from "axios";

 const axiosConfig = axios.create({
  baseURL: "https://dashboard.free.beeceptor.com/"
});

export default axiosConfig;
