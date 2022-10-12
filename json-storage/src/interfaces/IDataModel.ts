import { Document } from "mongoose";

interface IDataModel extends Document {
  route: string;
  data: string;
}

export default IDataModel;
