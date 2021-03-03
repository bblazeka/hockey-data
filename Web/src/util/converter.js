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