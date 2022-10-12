const express = require("express");
const app = express();
const findLolocation = require("./service");

app.get("/", function (req, res) {
  const reqIp = req.headers["x-forwarded-for"];
  const result = findLolocation(reqIp);
  res.end(result);
});

app.listen(4000, () => {
  console.log("Express server listening on port 4000");
});
