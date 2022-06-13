const express = require('express');
const app = express();
const usersRouter = require('./routers/usersRouter');



app.use(express.json());
app.use("/", usersRouter)

const start = async() => {
    try {
        app.listen(4000)
    } catch (err) {
        console.log(err);  
    }
}

start();