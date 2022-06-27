import express from "express";
import { Express } from "express";
import { router } from "./routes/jsonRoutes";
import config from "./config/config"; 


const app: Express = express();
app.set("view engine", "hbs");
app.set('views', "C:\\Users\\12345\\Desktop\\lambda-tasks\\json-storage\\src\\views");
app.use(express.json());
app.use(express.text());
app.use(router);
app.listen(config.server.port, () => {
    console.log(`Example app listening on port ${config.server.port}`)
})