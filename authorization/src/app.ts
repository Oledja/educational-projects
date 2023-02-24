import express from "express";
import * as dotenv from "dotenv";
import { init } from "./db/connection";
import { userRouter } from "./routes/UserRouter";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/", userRouter);

app.listen(5000, async () => {
  await init();
  console.log("Express server listening on port 5000");
});
