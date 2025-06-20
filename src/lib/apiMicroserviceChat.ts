import axios from "axios";

const apiChat = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export default apiChat;
