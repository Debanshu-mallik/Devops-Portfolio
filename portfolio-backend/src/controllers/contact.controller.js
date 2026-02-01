export function submitContact(req, res) {
  const { email, message } = req.body || {};

  if (!email || !message) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  console.log(JSON.stringify({
    logType: "CONTACT_EVENT",
    email,
    messageLength: message.length,
    ip: req.ip,
    timestamp: new Date().toISOString()
  }));

  res.sendStatus(204);
}
