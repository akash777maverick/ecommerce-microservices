const jwt = require('jsonwebtoken')

export async function isAthenticated (req, res, next) {
    jwt.verify(token, "secret", (err, user) => {
        if(err) {
            return res.json({message: err})
        }
        else {
            req.user = user
            next()
        }
    })
}