import { Document } from "mongoose";

interface DataModelResponse extends Document {
  route: string;
  data: string;
}

export default DataModelResponse;
