export const calculateDaysBetween = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  const differenceInMilliseconds = end.getTime() - start.getTime();

  return Math.ceil(differenceInMilliseconds / oneDayInMilliseconds) + 1;
};
