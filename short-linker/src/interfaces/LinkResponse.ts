import { RowDataPacket } from "mysql2";

interface LinkResponse extends RowDataPacket {
  url: string;
}

export default LinkResponse;
