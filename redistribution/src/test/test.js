"use strict";
exports.__esModule = true;
exports.options = void 0;
var http_1 = require("k6/http");
var tokens = ["ROZETKA", "MOYO", "COMFY", "FOXTROT", "ELDORADO", "FAKE_STORE"];
var names = [
    "Allen",
    "Bob",
    "Carlton",
    "David",
    "Ernie",
    "Foster",
    "George",
    "Howard",
    "Ian",
    "Jeffery",
    "Kenneth",
    "Lawrence",
    "Michael",
    "Nathen",
    "Orson",
    "Peter",
    "Quinten",
    "Reginald",
    "Stephen",
    "Thomas",
    "Morris",
    "Alice",
    "Bonnie",
    "Cassie",
    "Donna",
    "Ethel",
    "Grace",
    "Heather",
    "Jan",
    "Katherine",
    "Julie",
    "Marcia",
    "Patricia",
    "Mabel",
    "Jennifer",
    "Dorthey",
    "Mary Ellen",
    "Jacki",
    "Jean",
    "Betty",
    "Diane",
    "Annette",
    "Dawn",
    "Jody",
    "Karen",
];
var getRandomNumber = function (min, max) {
    return +(Math.random() * (max - min) + min).toFixed();
};
var generatePassword = function () {
    var password = "";
    var symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++) {
        password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    return password;
};
var randomStoreToken = function () { return tokens[getRandomNumber(0, 5)]; };
var randomName = function () { return names[getRandomNumber(0, names.length - 1)]; };
exports.options = {
    duration: "3s",
    vus: 300
};
exports["default"] = (function () {
    var url = 'https://rj77zce3xj.execute-api.us-east-1.amazonaws.com/dev/api/v1/redistribution';
    var payload = JSON.stringify({
        storeToken: randomStoreToken(),
        username: randomName(),
        password: generatePassword()
    });
    var params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    var resp = http_1["default"].post(url, payload, params);
    console.log(resp.error_code);
});
