import { Document } from "mongodb";

interface User extends Document {
  username: string;
  password: string;
  refreshToken: string;
}

export default User;
