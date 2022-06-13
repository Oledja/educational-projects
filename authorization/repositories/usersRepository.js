const {MongoClient} = require('mongodb');
const client = new MongoClient("mongodb+srv://oleg:pass@cluster0.xmvy8bw.mongodb.net/?retryWrites=true&w=majority");

class UserRepository {

    async save(user) {
        try {
            await client.connect();
            const collection = client.db().collection("users");
            await collection.insertOne(user);
        } catch (err) {
            console.log(err);
        }
    }

    async find(username) {
        try {
            await client.connect();
            const collection = client.db().collection("users");
            return collection.findOne(username);
        } catch (err) {
            console.log(err);
        } 
    }
}

module.exports = new UserRepository();
