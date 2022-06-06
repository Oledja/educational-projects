const express = require('express');
const app = express();
const service = require('./service');

app.use(express.json())

app.post('/', function (req, res) {
    const answer = service.calkSumAndTime(req.body);
    res.end(JSON.stringify(answer));
});

app.listen(4000, function(){
    console.log('Express server listening on port 4000');
});