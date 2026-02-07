import dotenv from "dotenv";

dotenv.config();

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const NODE_ENV = process.env.NODE_ENV || "development";

// Fail fast in production


if (NODE_ENV === "production") {
  required("GITHUB_USERNAME");
  required("GITHUB_TOKEN");
}