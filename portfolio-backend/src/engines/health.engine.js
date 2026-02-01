export function getHealth({ status, hasDocs }) {
  if (status === "Active" && hasDocs) return "Excellent";
  if (status === "Maintained") return "Good";
  if (status === "Archived" && hasDocs) return "Attention";
  return "Dormant";
}
