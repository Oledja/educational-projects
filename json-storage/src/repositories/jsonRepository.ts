import config from "../config/config"; 
import mongoose, { Schema } from "mongoose";
import IJson from "../interfaces/json";


mongoose.connect(config.mongo.url, config.mongo.options)
    .then(result => {
        console.log("MongoDB connextion successful");
    })
    .catch(error => {
        console.log(error);
    });
const JsonSchema: Schema = new Schema({
    route: {type: String, required: true},
    data: {type: Object, required: true}
});

export default mongoose.model<IJson>("json-storage", JsonSchema);


