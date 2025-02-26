export type ValidDate = Date | string | number;

export const validateDate = (date: ValidDate): Date | null => {
  if (date === null || date === undefined) return null;

  let dateObj: Date | undefined;

  // unix timestamp?
  if (typeof date === "number") {
    const length = date.toString().length;

    if (length === 10) {
      dateObj = new Date(date * 1000); // seconds → milliseconds
    } else if (length === 13) {
      dateObj = new Date(date); // milliseconds
    } else if (length === 16) {
      dateObj = new Date(date / 1000); // microseconds → milliseconds
    } else {
      console.error("Invalid Unix Timestamp");
      return null;
    }

    // string?
  } else if (typeof date === "string") {
    dateObj = new Date(date);

    // date object?
  } else if (date instanceof Date) {
    dateObj = date;
  } else {
    console.error("Invalid Date");
    return null;
  }

  if (isNaN(dateObj.getTime())) {
    console.error("Invalid Date Format");
    return null;
  }

  return dateObj;
};
