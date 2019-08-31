export function covertDateTimeToString(date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
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