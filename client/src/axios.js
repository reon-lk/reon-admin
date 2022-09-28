import axios from "axios";
let user
if (localStorage.getItem("token")) {
  const token = JSON.parse(localStorage.getItem("token"));
  user = `Bearer ${token}`
} else {
  user = "7777";
}

const instance = axios.create({
  baseURL: "http://localhost:5001/api",

  withCredentials: false,
  headers: {
    "Content-type": "application/json",
    Authorization: user,
  },
});

export default instance;
