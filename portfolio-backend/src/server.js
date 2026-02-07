import "./config/env.js";                   // 1️⃣ validate env (fail fast)
import config from "./config/index.js";     // 2️⃣ read structured config
import app from "./app.js";

app.listen(config.port, () => {
  console.log(JSON.stringify({
    logType: "SYSTEM",
    message: "Portfolio backend started",
    port: config.port,
    env: config.env,
    timestamp: new Date().toISOString()
  }));
});