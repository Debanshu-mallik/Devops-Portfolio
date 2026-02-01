export function getDuration(size) {
  if (size < 500) return "Short";
  if (size < 3000) return "Medium";
  return "Long";
}
