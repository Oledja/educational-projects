import { RowDataPacket } from "mysql2";

interface ShortLinkerResponse extends RowDataPacket {
    url: string
}

export default ShortLinkerResponse;