import moment from "moment";

export function humanReadableTime(str) {
  const timestamp = moment(str);
  return timestamp.format('dddd MMMM Do, YYYY [at] h:mm:ss a')
}