function calkSumAndTime(requestJson) {
    const request = parseRequest(requestJson);
    const price = getPrice(request.languageCoef, request.mimetypeCoef, request.count);
    const time = getTime(request.amountLetters, request.mimetypeCoef, request.count);
    const deadline = getDeadline(new Date(), time);
    const response = prepareResponse(price, time, deadline);
    return response;
}

function getPrice(languageCoef, mimetypeCoef, count) {
    const minCount = 1000;
    if (count <= minCount) {
        return languageCoef * minCount * mimetypeCoef;
    }
    return parseFloat((count * languageCoef * mimetypeCoef).toFixed(2));
}

function getTime(amountLetters, mimetypeCoef,count ) {
    const minTime = 60;
    const startTime = 30;
    let time =  count * (3600 / amountLetters);
    time =  Math.round(time / 60 + startTime);
    time = time <= minTime ? minTime : time;
    return time * 60 * 1000 * mimetypeCoef;
}

function getDeadline(date, time) {
    if (!isWorkHours(date) || !isWorkDay(date)) {
        date = getWorkDay(new Date(date));
    }
    let workTime = getWorkTime(date);
    if (workTime >= time) {
        return new Date(date.getTime() + time)
    } else {
        let nextDate = getNextDay(date);
        let newTime = time - workTime;
        return getDeadline(nextDate, newTime)
    }
}

function parseRequest(requestJson) {
    const language = requestJson.language;
    const mimetype = requestJson.mimetype;
    const count = requestJson.count;

    return {
        amountLetters: language == "en" ? 333 : 1333,
        languageCoef: language == "en" ? 0.12 : 0.05,
        mimetypeCoef: mimetype == "other" ? 1.2 : 1,
        count: count
    }
}

function prepareResponse(price, time, deadline) {
    const timeToMinutes = time / 1000 / 60;
    const workHours = Math.floor(timeToMinutes / 60);
    const workMinutes = Math.round(timeToMinutes - workHours * 60) 
    return {
        price: price,
        time: workHours + ":" + workMinutes,
        deadline: deadline.getTime(),
        deadline_date: deadline.toLocaleString().replaceAll(".", "/").replaceAll(",", "")
    }
}

function getWorkTime(date) {
    const endTime = new Date(date).setHours(19, 0, 0);
    let time = endTime - date.getTime();
    return time;
}

function getWorkDay(date) {
    if (isWorkDay(date) && date.getHours() < 10) {
        date.setHours(10, 0, 0);
    }
    while (!isWorkDay(date) || date.getHours() >= 19) {
        date.setDate(date.getDate() + 1);
        date.setHours(10, 0, 0);
    }
    return new Date(date);
}

function isWorkDay(date) {
    return date.getDay() != 6 && date.getDay() != 0;
}

function isWorkHours(date) {
    return date.getHours() >= 10 && date.getHours() < 19;
}

function getNextDay(date) {
    date.setDate(date.getDate() + 1);
    date.setHours(10, 0, 0);
    return new Date(date);
}

module.exports = {getNextDay, isWorkHours, isWorkDay, getWorkDay, getWorkTime, 
    prepareResponse, parseRequest, getDeadline, getTime, getPrice, calkSumAndTime};