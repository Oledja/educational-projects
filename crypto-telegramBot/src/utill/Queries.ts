const INSERT = "INSERT INTO currencies (chat_id, symbol) VALUES (?, ?)";
const SELECT_ALL = "SELECT symbol FROM currencies WHERE chat_id = ?";
const SELECT_ONE =
  "SELECT symbol FROM currencies WHERE symbol = ? AND chat_id = ?";
const DELETE = "DELETE FROM currencies WHERE chat_id = ? AND symbol = ?";

export { INSERT, SELECT_ALL, SELECT_ONE, DELETE };
