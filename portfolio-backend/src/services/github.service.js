import axios from "axios";
import { GITHUB_USERNAME, GITHUB_TOKEN } from "../config/env.js";

const client = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : undefined,
    Accept: "application/vnd.github+json"
  }
});

export async function fetchRepos() {
  const res = await client.get(`/users/${GITHUB_USERNAME}/repos?per_page=100`);
  return res.data;
}
