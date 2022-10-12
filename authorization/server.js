const express = require("express");
const app = express();
const usersRouter = require("./src/routers/userRouter");

app.use(express.json());
app.use("/", usersRouter);

app.listen(5000, () => {
    console.log("Express server listening on port 5000");
});