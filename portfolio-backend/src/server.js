import app from "./app.js";
import {PORT} from "./config/env.js";

app.listen(PORT , () => {
    console.log(JSON.stringify({
        logType: "SYSTEM",
        message: "Portfolio backend Started",
        port: PORT,
        timestamp: new Date().toISOString()
    }));
});