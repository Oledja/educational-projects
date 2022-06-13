const usersRepository = require('../repositories/usersRepository');
const jwt = require('jsonwebtoken');
const {secret} = require('../config/config');
const refreshTokenService = require('./refreshTokenServise');
const { generateRefreshToken } = require('./refreshTokenServise');
const tokensRepository = require('../repositories/tokensRepository');

class UserService {   
    async signUp(user) {
        const candidate = await usersRepository.find({ email: user.email });
        if (candidate) {
            throw Error(`user with email: ${user.email} aready exists`);
        }
        return await usersRepository.save(user);
    }

    async login(email, password) {
        const user = await usersRepository.find({ email });
        if (!user || password != user.password) {
            throw new Error(`The username or password is incorrect`)
        }

        await refreshTokenService.remove(user._id);
        const newPairTokens = genereatePairOfTokens(user);
        return newPairTokens;
    }

    async refresh(refreshToken) {
        const dbRefreshToken = await tokensRepository.find(refreshToken);
        if (!dbRefreshToken) {
            throw new Error("Unauthorised");
        }
        try {
            jwt.verify(dbRefreshToken.token, secret);
            const user = await usersRepository.find({_id: dbRefreshToken.userId});
            const newPairTokens = genereatePairOfTokens(user);
            return newPairTokens;
        } catch (err) {
            throw new Error("Unauthorised");
        }
    }

    async getMe(url, user) {
        return {
            "request_num": url.substring(url.length - 1),
            "data": {
                "username": user.email
                }}
    }
}

async function genereatePairOfTokens(user) {
    await refreshTokenService.remove(user._id);
    const token = refreshTokenService.generateAccsessToken(user.email);
    const newRefreshToken = generateRefreshToken();
    await refreshTokenService.add(user._id, newRefreshToken);
    return {
              token: token,
              refreshToken: newRefreshToken
           }
}

module.exports = new UserService();