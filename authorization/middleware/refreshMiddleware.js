module.exports = function(req, res, next) {
    try {
        if (req.headers.authorization == undefined) {
            return res.status(401).json({message: "Unauthorised"});
        }
        const refreshToken = req.headers.authorization.split(" ")[1];
        req.refreshToken = refreshToken;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({message: "Unauthorised"});
    }
}