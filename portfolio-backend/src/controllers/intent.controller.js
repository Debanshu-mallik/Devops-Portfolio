export function captureIntent(req, res) {
  const {event, project } = req.body || {};
  
  console.log(JSON,stringify({
    logType: "INTENT_EVENT",
    event,
    project,
    ip: req.ip,
    timestamp: new Date().toISOString()
    }));
    
  res.sendStatus(204);
    
}
