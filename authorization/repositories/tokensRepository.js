const {MongoClient} = require('mongodb');
const client = new MongoClient("mongodb+srv://oleg:pass@cluster0.xmvy8bw.mongodb.net/?retryWrites=true&w=majority");

class TokensRepository {
    async find(refreshToken) {
        try {
            await client.connect();
            const collection = client.db().collection("tokens");
            return await collection.findOne({token: refreshToken});
        } catch (err) {
            console.log(err);
        }
    }

    async add(userId, refreshToken) {
        try {
            await client.connect();
            const collection = client.db().collection("tokens");
            return await collection.insertOne({
                token: refreshToken,
                userId
            });
        } catch (err) {
            console.log(err);
        }
    }   

    async remove(userId) {
        await client.connect();
        const collection = client.db().collection("tokens");
        return await collection.deleteOne({userId})
    }
}

module.exports = new TokensRepository();