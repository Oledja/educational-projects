const INSERT =
  "INSERT INTO currencies (symbol, name, price, market, created_at) VALUES ?";
const SELECT_BY_NAME_AND_TIME =
  "SELECT symbol, name, price, market, created_at FROM currencies WHERE symbol = ? AND created_at > ?";
const SELECT_BY_NAME_AND_TIME_AND_MARKET =
  "SELECT symbol, name, price, market, created_at FROM currencies WHERE symbol = ? AND created_at > ? AND market = ?";
export { INSERT, SELECT_BY_NAME_AND_TIME, SELECT_BY_NAME_AND_TIME_AND_MARKET };
