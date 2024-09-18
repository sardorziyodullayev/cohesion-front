import dayjs from "dayjs";

// import en from "dayjs/locale/en";
import en from "dayjs/locale/en";
// import uz from "dayjs/locale/uz-latn";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeDate from "dayjs/plugin/relativeTime";

dayjs.extend(relativeDate);
dayjs.locale(en);
dayjs.extend(customParseFormat);

const formatDate = (date: string, formatString: string) => {
  return dayjs(date).format(formatString);
};

const formatDateToDistance = (date: Date, compareDate: Date = new Date()) => {
  return dayjs(date).from(compareDate);
};

const addDate = (date: Date, number: number, unit: dayjs.ManipulateType) => {
  return dayjs(date).add(number, unit).toDate();
};

const subtractDate = (date: Date, number: number, unit: dayjs.ManipulateType) => {
  return dayjs(date).subtract(number, unit).toDate();
};

const parseDate = (date: string, format: string) => {
  return dayjs(date, format).toDate();
};

export { formatDate, formatDateToDistance, addDate, subtractDate, parseDate };
