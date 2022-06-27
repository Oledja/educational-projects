import { Document } from "mongoose";

export default interface IJson extends Document {
    route: string;
    data: string;
} 