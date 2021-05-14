var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

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

function GetNumberWithOrdinal(n) {
  var s = ["th", "st", "nd", "rd"],
      v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function IsNullOrUndefined (obj)  {
  return obj === null || obj === undefined;
}

function FormatDecimals(number, decimalPlaces)
{
  if (!IsNullOrUndefined(number) && !isNaN(number))
  {
    return number.toFixed(decimalPlaces);
  }
  return null;
}

function FormatNumberToCurrency(number)
{
  return formatter.format(number);
}

module.exports = {
  DateToServerFormat,
  GetNumberWithOrdinal,
  IsNullOrUndefined,
  FormatDecimals,
  FormatNumberToCurrency
}