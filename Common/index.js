function DateToServerFormat(date) {
  if (typeof(date)==="string")
  {
    date = new Date(date);
  }
  // Get the day as a number (1-31)
  var day = (date.getDate() + 0)
  // Get the month as a number (0-11)
  var month = (date.getMonth() + 1)
  return date.getFullYear() + "-" + (month <= 9 ? "0" + month : month) + "-" + (day <= 9 ? "0" + day : day);
}

function DateToTimeOnly(date) {
  var hours = date.getHours();
  var mins = date.getMinutes();
  return (hours <= 9 ? "0" + hours : hours) + ":" + (mins <= 9 ? "0" + mins : mins);
}


function IsNullOrUndefined (obj)  {
  return obj === null || obj === undefined;
} 

module.exports = {
  DateToServerFormat,
  DateToTimeOnly,
  IsNullOrUndefined
}