import axios from "axios";

const based_url = "https://flask.sakoo.my.id";

const api = axios.create({
  baseURL: based_url,
});

const CONFIG = {
  BASE_URL: "https://story-api.dicoding.dev/v1",
};

export default { api, CONFIG };
