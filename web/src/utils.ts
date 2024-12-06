export function convertSecondsToDaysAndHours(seconds: number) {
  const days = Math.floor(seconds / (24 * 3600));
  const remainingSeconds = seconds % (24 * 3600);
  const hours = Math.floor(remainingSeconds / 3600);

  return { days, hours };
}
