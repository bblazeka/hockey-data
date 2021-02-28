function DateToFormat(date) {
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

module.exports = {
  DateToFormat
}