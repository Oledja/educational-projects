require("dotenv").config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DB_URL);

class UserRepository {
  async save(user) {
    try {
      const collection = await getConnection();
      await collection.insertOne(user);
    } catch (err) {
      throw new Error(
        "Sorry, we have a technical problem, please try again later"
      );
    }
  }

  async findByEmail(email) {
    try {
      const collection = await getConnection();
      return collection.findOne(email);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

const getConnection = async () => {
  await client.connect();
  return client.db().collection("users");
};

module.exports = new UserRepository();
