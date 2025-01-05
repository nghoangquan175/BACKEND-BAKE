import jwt from "jsonwebtoken"
import 'dotenv/config'

const generateAccessToken = (customer_id) => {
    return jwt.sign({
        customer_id: customer_id
    },
        process.env.SECRETKEY,
        {
            expiresIn: '30m'
        }
    )
}

const generateRefreshToken = (customer_id) => {
    return jwt.sign({
        customer_id: customer_id
    },
        process.env.SECRETKEY,
        {
            expiresIn: '7d'
        }
    )
}

module.exports = {
    generateRefreshToken,
    generateAccessToken
}