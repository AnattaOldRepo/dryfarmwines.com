import { isEmptyObject } from "./isEmptyObject";

export const nextDateFromObj = deliveryObj => {
  let nextDate;
  let dateDiff;
  let newDateDiff;
  let currentDate = new Date();
  if (isEmptyObject(deliveryObj)) {
    Object.keys(deliveryObj).forEach(date => {
      if (date > currentDate) newDateDiff = date - currentDate;
      if (!dateDiff) {
        dateDiff = newDateDiff;
        nextDate = date;
      } else {
        if (newDateDiff < dateDiff) {
          dateDiff = newDateDiff;
          nextDate = date;
        }
      }
    });
    return nextDate;
  }
};
