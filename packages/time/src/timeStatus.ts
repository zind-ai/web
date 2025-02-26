import { validateDate, ValidDate } from "./utils/validateDate";

export const timeStatus = (date: ValidDate) => {
  const dateObj = validateDate(date);
  if (!dateObj) return null;

  const now = new Date();

  const currentHour = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    0,
    0,
    0
  );
  const dateHour = new Date(
    dateObj.getFullYear(),
    dateObj.getMonth(),
    dateObj.getDate(),
    dateObj.getHours(),
    0,
    0,
    0
  );

  if (dateHour < currentHour) {
    return "past";
  } else if (dateHour > currentHour) {
    return "future";
  } else {
    return "now";
  }
};
