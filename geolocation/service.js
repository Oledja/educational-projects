const {readFileSync} = require('fs');
const ipToInt = require('ip-to-int');

let ipAdresses = readFileSync('./IP2LOCATION-LITE-DB1.CSV', 'utf-8').split('\n');

function findGeolocationByIp(ip) {
    const ipInt = ipToInt(ip).toInt();
    let result = findGeolocationInDB(ipInt, ipAdresses);
    result = parseIpFromDB(result);
    return showResult(result);
}

function parseIpFromDB(ip) {
    let location = ip.split(',');
    const start = parseInt(location[0].replaceAll('\"', ''));
    const end = parseInt(location[1].replaceAll('\"', ''));
    const country = location[3].replaceAll('\r', '');

    return {
        start: start,
        end: end,
        country: country
    }
}

function findGeolocationInDB(ip, locations) {
    if (locations.length == 1) {
        return locations[0];
    }
    let index = Math.round(locations.length / 2);
    let current = parseIpFromDB(locations[index]);

    if (ip < current.start) {
        return findGeolocationInDB(ip, locations.slice(0, index));
    } else if (ip > current.end) {
        return findGeolocationInDB(ip, locations.slice(index, locations.length));
    } else {
        return locations[index];
    }
}

function showResult(location) {
    const start = ipToInt(location.start).toIP();
    const end = ipToInt(location.end).toIP();
    return `ip: ${start} - ${end} ${location.country}`;
}

module.exports = findGeolocationByIp;

