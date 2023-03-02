import mongoose, { Schema } from "mongoose";
import ModelResponse from "../interfaces/ModelResponse";

const Model = new Schema({
  route: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});

export default mongoose.model<ModelResponse>("jsons", Model);
