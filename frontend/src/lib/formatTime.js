//Convert ISO date string to a formatted date and time string
// This function takes an ISO date string and formats it to a more readable format
export const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    //   hour12: true,
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'Asia/Kathmandu',
  });
};
