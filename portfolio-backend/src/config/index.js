import "./env.js";

const config = {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 3000),

  github: {
    username: process.env.GITHUB_USERNAME || "",
    token: process.env.GITHUB_TOKEN || "",
  },

  cache: {
    ttl: Number(process.env.CACHE_TTL || 300),
  },
};

export default config;