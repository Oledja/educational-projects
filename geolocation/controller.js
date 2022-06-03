const express = require('express');
const app = express();
const findGeolocationByIp = require('./service');

app.get('/', function (req, res) {
    console.log(req.headers['x-forwarded-for']);
    const reqIp = req.headers['x-forwarded-for'];
    const result = findGeolocationByIp(reqIp);
    res.end(result);
});

app.listen(4000, function(){
    console.log('Express server listening on port 4000');
});
