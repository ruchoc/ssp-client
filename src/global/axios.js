import axios from "axios";
import { proxyPath } from "@/global/config";

axios.defaults.baseURL = proxyPath;
// axios.defaults.baseURL='http://127.0.0.1:8080'
axios.defaults.withCredentials = true;

export default axios;
