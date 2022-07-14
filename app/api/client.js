import axios from "axios";

const client = axios.create({
  baseURL:
    "https://rakhita-music-app.herokuapp.com/api/post/single/warbletoncouncil",
}); //"http://yor_machine_ip:database_allow_port/api"

export default client;
