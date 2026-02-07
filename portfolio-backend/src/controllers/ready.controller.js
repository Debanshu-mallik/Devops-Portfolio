import { checkReadiness } from "../engines/ready.engine.js";

export async function readiness(req, res) {
  const result = await checkReadiness();

  const statusCode = result.status === "READY" ? 200 : 503;
  res.status(statusCode).json(result);
}