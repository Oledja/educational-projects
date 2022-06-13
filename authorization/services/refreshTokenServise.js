const tokensRepository = require('../repositories/tokensRepository');
const {secret} = require('../config/config');
const jwt = require('jsonwebtoken');
class RefreshTokenService {
    async add(userId, refreshToken) {
        try {
            await tokensRepository.add(userId, refreshToken);
        } catch (err) {
            console.log(err);
        }
    }

    async remove(userId) {
        await tokensRepository.remove(userId) 
    }
    
    generateAccsessToken = (email) => {
        const time = Math.floor(30 + Math.random()*(60 - 30 + 1));
        return jwt.sign({ email }, secret, {expiresIn: time + "s"});
    }

    generateRefreshToken = () => {
        return jwt.sign({}, secret, {expiresIn: "1m"});
    }
}

module.exports = new RefreshTokenService();