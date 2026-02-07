import axios from "axios";
import config from "../config/index.js";

const client = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    ...(config.github.token && {
      Authorization: `Bearer ${config.github.token}`,
    }),
    Accept: "application/vnd.github+json",
  },
});

export async function fetchRepos() {
  const res = await client.get(
    `/users/${config.github.username}/repos?per_page=100`
  );
  return res.data;
}
