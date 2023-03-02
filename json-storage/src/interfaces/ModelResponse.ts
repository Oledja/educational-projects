import { Document } from "mongoose";

interface ModelResponse extends Document {
  route: string;
  data: string;
}

export default ModelResponse;
