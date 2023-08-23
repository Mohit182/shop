import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-clone-d2539.cloudfunctions.net/api", //API(cloud function) URL
  // "http://localhost:5001/clone-d2539/us-central1/api",
});

export default instance;
