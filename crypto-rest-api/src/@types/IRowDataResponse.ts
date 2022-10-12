import { RowDataPacket } from "mysql2";
import ICryptocurrency from "./ICryptocurrency";

interface IRowDataResponse extends ICryptocurrency, RowDataPacket {}

export default IRowDataResponse;
