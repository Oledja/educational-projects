const jwt = require('jsonwebtoken');
const {secret} = require('../config/config');


module.exports = function (req, res, next) {
    try {
        if (req.headers.authorization == undefined) {
            return res.status(401).json({message: "Unauthorised"});
        }
        const token = req.headers.authorization.split(" ")[1];
        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({message: "Unauthorised"});
    }
};