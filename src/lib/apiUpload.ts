import axios from "axios";

const apiUpload = axios.create({
  baseURL: "http://localhost:4000/api/uploadthing",
  withCredentials: false,
});

export default apiUpload;
