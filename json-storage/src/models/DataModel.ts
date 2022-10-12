import IDataModel from "../interfaces/IDataModel";
import mongoose, { Schema } from "mongoose";

const DataModel = new Schema({
  route: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IDataModel>("jsons", DataModel);
