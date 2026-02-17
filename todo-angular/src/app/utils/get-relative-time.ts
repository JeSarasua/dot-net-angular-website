export function getRelativeTime(dueDate: string): string {
  const diff = new Date(dueDate).getTime() - Date.now();
  const sign = diff < 0 ? '-' : '';
  const absDiff = Math.abs(diff);

  const minutes = Math.round(absDiff / 60000);
  const hours = Math.round(absDiff / 3600000);
  const days = Math.round(absDiff / 86400000);
  const years = Math.round(days / 365);

  if (minutes < 60) return `${sign}${minutes} minute${minutes !== 1 ? 's' : ''}`;
  if (hours < 24) return `${sign}${hours} hour${hours !== 1 ? 's' : ''}`;
  if (days < 365) return `${sign}${days} day${days !== 1 ? 's' : ''}`;
  return `${sign}${years} year${years !== 1 ? 's' : ''}`;
}
