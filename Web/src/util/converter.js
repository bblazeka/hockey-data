export function convertDateTimeToString(date) {
  if (typeof(date)==="string")
  {
    date = new Date(date);
  }
  // Get the day as a number (1-31)
  var day = (date.getDate() + 0)
  // Get the month as a number (0-11)
  var month = (date.getMonth() + 1)
  return date.getFullYear() + "-" + (month <= 9 ? "0" + month : month) + "-" + (day <= 9 ? "0" + day : day)
}

export function dateTimeFilterTime(date)
{
  if (typeof(date)==="string")
  {
    date = new Date(date);
  }
  var hours = (date.getHours() + 0)
  var mins = (date.getMinutes() + 0)
  return (hours <= 9 ? "0" + hours : hours) + ":" + (mins <= 9 ? "0" + mins : mins)
}

export function getDatesArray(startDate, stopDate) {
  var dateArray = [];
  var currentDate = new Date(startDate.getTime());
  var modifiedStopDate = new Date(stopDate.getTime());
  modifiedStopDate.setSeconds(modifiedStopDate.getSeconds() + 50);
  while (currentDate <= modifiedStopDate) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray;
}