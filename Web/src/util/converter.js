export function covertDateTimeToString(date) {
    var day = (date.getDate() + 1)
    var month = (date.getMonth() + 1)
    return date.getFullYear() + "-" + (month <= 9 ? "0"+month : month) + "-" + (day <= 9 ? "0"+day : day)
}

export function getDatesArray(startDate, stopDate) {
    var dateArray = [];
    var currentDate = new Date(startDate.getTime());
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
}