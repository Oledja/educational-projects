const INSERT =
  "INSERT INTO coins (symbol, name, price, market, createdAt) VALUES (?, ?, ?, ?, ?)";
const SELECT_BY_NAME_AND_TIME =
  "SELECT symbol, name, price, market, createdAt FROM coins WHERE symbol = ? AND createdAt > ?";
const SELECT_BY_NAME_AND_TIME_AND_MARKET =
  "SELECT symbol, name, price, market, createdAt FROM coins WHERE symbol = ? AND createdAt > ? AND market = ?";
export { INSERT, SELECT_BY_NAME_AND_TIME, SELECT_BY_NAME_AND_TIME_AND_MARKET };
