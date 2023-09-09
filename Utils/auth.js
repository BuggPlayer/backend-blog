const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const LogController = require('../Controllers/LogController')

const JwtSign = (values, expiry, secret) => {
    try {
        var token = jwt.sign(values, secret, expiry);
        return token;
    } catch (error) {
        return undefined;
    }

}

const comparePassword = (password, value) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, value).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    })
}

const verifyToken = (req, res, next) => {
    var token = req.body.token || req.headers['access-token']
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, verified) => {
        if (!err) {
            next();
        } else {
            LogController.createLog('warn', `Token verification failed`)
            next()
            // return res.status(200).json({ message: "Token Expired / Invalid" })
            // return res.status(401).json({ message: "Token Expired / Invalid" })
        }
    })
}
module.exports = { JwtSign, comparePassword, verifyToken }