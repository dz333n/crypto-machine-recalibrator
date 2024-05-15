export function formatDuration(startDate: Date, endDate: Date) {
  const millisecondsPerSecond = 1000;
  const millisecondsPerMinute = 60000;
  const millisecondsPerHour = 3600000;

  const differenceInMilliseconds = endDate.getTime() - startDate.getTime();

  const hours = Math.floor(differenceInMilliseconds / millisecondsPerHour);
  const minutes = Math.floor(
    (differenceInMilliseconds % millisecondsPerHour) / millisecondsPerMinute
  );
  const seconds = Math.floor(
    (differenceInMilliseconds % millisecondsPerMinute) / millisecondsPerSecond
  );

  let formattedDuration = "";
  if (hours > 0) {
    formattedDuration += `${hours}h `;
  }
  if (minutes > 0 || hours > 0) {
    // Include minutes if there are hours or minutes
    formattedDuration += `${minutes}m `;
  }
  if (hours === 0) {
    // Include seconds only if there are no hours
    formattedDuration += `${seconds}s`;
  }

  return formattedDuration.trim(); // Remove any trailing spaces
}
