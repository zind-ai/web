import { days } from "./days";
import { formats } from "./formats";
import {
  day,
  hours,
  minutes,
  month,
  monthName,
  year,
} from "../utils/dateDestructured";
import { getDaySuffix } from "../utils/getDaySuffix";

export const formatHandlers = {
  [formats["hh:mm"]]: (date: Date) => {
    return `${hours(date)}:${minutes(date)}`;
  },
  [formats["D"]]: (date: Date) => {
    return days[date.getDay()];
  },
  [formats["yyyy"]]: (date: Date) => {
    return year(date);
  },
  [formats["yyyy-mm-dd"]]: (date: Date) => {
    return `${year(date)}-${month(date)}-${day(date)}`;
  },
  [formats["dd/mm/yyyy hh:mm"]]: (date: Date) => {
    return `${day(date)}/${month(date)}/${year(date)} ${hours(date)}:${minutes(date)}`;
  },
  [formats["MMM ddth, yyyy"]]: (date: Date) => {
    const month = monthName(date, "short");
    const dayNumber = day(date, false);
    const suffix = getDaySuffix(parseInt(dayNumber));
    return `${month} ${dayNumber}${suffix}, ${year(date)}`;
  },
  [formats["MMM ddth, yyyy hh:mm"]]: (date: Date) => {
    const month = monthName(date, "short");
    const dayNumber = day(date, false);
    const suffix = getDaySuffix(parseInt(dayNumber));
    const hourMins = `${hours(date)}:${minutes(date)}`;
    return `${month} ${dayNumber}${suffix}, ${year(date)} ${hourMins}`;
  },

  // unix timestamp
  [formats["unix-seconds"]]: (date: Date) =>
    Math.floor(date.getTime() / 1000).toString(), // seconds
  [formats["unix-milliseconds"]]: (date: Date) => date.getTime().toString(), //  milliseconds
  [formats["unix-microseconds"]]: (date: Date) =>
    (date.getTime() * 1000).toString(), // microseconds
};
