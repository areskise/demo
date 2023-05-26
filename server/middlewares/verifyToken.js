const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) {
        return res.status(401).json('Not authenticated!');
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secret', (err, decode) => {
        if(err) {
            return res.status(401).json('Token is not valid!');
        }
        next();
    });
}

module.exports = {verifyToken}