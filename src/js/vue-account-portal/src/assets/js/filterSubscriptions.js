import { isEmptyObject } from "./isEmptyObject";

export const filterSubscriptions = (subscriptions, key, val) => {
  if (!isEmptyObject(subscriptions)) {
    let activeSubscriptions = {};
    Object.keys(subscriptions).forEach(id => {
      if (subscriptions[id][key] === val) {
        activeSubscriptions[id] = subscriptions[id];
      }
    });
    return activeSubscriptions;
  }
};
