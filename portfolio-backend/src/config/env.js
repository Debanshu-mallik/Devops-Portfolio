import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "";
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
export const CACHE_TTL = Number(process.env.CACHE_TTL || 300);