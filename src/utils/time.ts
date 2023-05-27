import * as dayjs from "dayjs";

export function timeFromNow(timestamp: number) {
  const seconds = (Date.now() - timestamp) / 1000;
  if (seconds < 60) {
    return Math.floor(seconds) + " seconds ago";
  }
  if (seconds < 3600) {
    return Math.floor(seconds / 60) + " minutes ago";
  }
  if (seconds < 86400) {
    return Math.floor(seconds / 3600) + " hours ago";
  }
  if (seconds < 86400 * 2) {
    return "昨天";
  }
  if (seconds < 86400 * 365) {
    return dayjs(timestamp).format("MM/DD");
  }
  return dayjs(timestamp).format("YYYY/MM/DD");
}

export function ifToday(timestamp: number) {
  const today = new Date().setHours(0, 0, 0, 0);
  const theDay = new Date(timestamp).setHours(0, 0, 0, 0);
  if (theDay == today) {
    return dayjs(timestamp).format("hh:mm a	");
  } else {
    return dayjs(timestamp).format("MM/DD");
  }
}
