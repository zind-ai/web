import { MonthFormat } from "../types/monthFormat";

// seconds
export const seconds = (date: Date) =>
  date.getSeconds().toString().padStart(2, "0");

// minutes
export const minutes = (date: Date) =>
  date.getMinutes().toString().padStart(2, "0");

// hours
export const hours = (date: Date) =>
  date.getHours().toString().padStart(2, "0");

// day
export const day = (date: Date, padStart = true) =>
  date
    .getDate()
    .toString()
    .padStart(2, padStart ? "0" : "");

// month
export const month = (date: Date) =>
  (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based

export const monthName = (date: Date, format: MonthFormat = "short") =>
  new Intl.DateTimeFormat("en-US", {
    month: format,
  }).format(date);

// year
export const year = (date: Date) => date.getFullYear().toString();
