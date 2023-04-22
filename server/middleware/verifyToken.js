const jwt = require("jsonwebtoken")

verifyToken = (req, res, next) => {
    try {
        let token = req.headers["authorization"].split(" ")[1];
        let decodedToken = jwt.verify(token, "MY_TOKEN_SECRET")
        let user_id = decodedToken.user_id;
        req.body.user_id = user_id;
        next();
    } catch (error) {
        res.status(401).json({error}).end();
    }
}

module.exports = verifyToken;