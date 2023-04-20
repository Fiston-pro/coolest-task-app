import axios from "axios";

export default axios.create({
  baseURL: "https://coolest-task-gyob70gw9-fiston-pro.vercel.app/api/trpc/",
  timeout: 10000,
  headers: {'Content-Type': 'application/json'}
});
