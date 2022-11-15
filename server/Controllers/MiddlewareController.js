const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const MiddlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token
        if(token) {
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
                if(err) {
                    res.status(403).json("token is not valid")
                }
                req.user = user
                // res.status(200).json(user)
                next()
            })
        } else {
            res.status(401).json("you are not authenticated")
        }
    }
}

module.exports = MiddlewareController