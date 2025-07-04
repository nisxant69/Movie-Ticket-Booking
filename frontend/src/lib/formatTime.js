//Convert ISO date string to a formatted date and time string
// This function takes an ISO date string and formats it to a more readable format
export const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // or false for 24-hour
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kathmandu',
  });
};
