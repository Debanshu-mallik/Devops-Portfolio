export function getStatus(updatedAt) {
  const days =
    (Date.now() - new Date(updatedAt)) / (1000 * 60 * 60 * 24);

  if (days <= 30) return "Active";
  if (days <= 180) return "Maintained";
  return "Archived";
}
