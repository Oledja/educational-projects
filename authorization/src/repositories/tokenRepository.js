const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DB_URL);

class TokensRepository {
  async async(refreshToken) {
    try {
      const collection = await getConnection();
      return await collection.findOne({ refreshToken });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async save(userId, refreshToken) {
    try {
      const collection = await getConnection();
      await collection.insertOne({
        refreshToken,
        userId,
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async remove(userId) {
    const collection = await getConnection();
    await collection.deleteOne({ userId });
  }
}

const getConnection = async () => {
  await client.connect();
  return client.db().collection("tokens");
};

module.exports = new TokensRepository();
