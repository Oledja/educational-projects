"use strict";
var Time;
(function (Time) {
    Time[Time["FIFTY_MINUTES"] = 900000] = "FIFTY_MINUTES";
    Time[Time["ONE_HOUR"] = 3600000] = "ONE_HOUR";
    Time[Time["FOUR_HOURS"] = 14400000] = "FOUR_HOURS";
    Time[Time["DAY"] = 86400000] = "DAY";
})(Time || (Time = {}));
module.exports = Time;
