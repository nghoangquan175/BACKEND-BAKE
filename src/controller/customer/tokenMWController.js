import jwt from "jsonwebtoken"
import 'dotenv/config'

import tokenGeneration from '../../function/tokenGeneration'

const verifyAccessToken = async (req, res, next) => {
    try {
        const accesstoken = req.cookies.accesstoken
        if (accesstoken) {
            jwt.verify(accesstoken, process.env.SECRETKEY, async (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(403).json({
                        message: 'Bạn cần đăng nhập!',
                        code: '0',
                    });
                }
                req.id = data.customer_id
                next()
            });
        } else {
            const refreshtoken = req.cookies.refreshtoken
            if (!refreshtoken) {
                return res.status(403).json({
                    message: 'Bạn cần đăng nhập!',
                    code: '0',
                });
            }

            jwt.verify(refreshtoken, process.env.SECRETKEY, async (err, data) => {
                if (err) {
                    return res.status(403).json({
                        message: 'Bạn cần đăng nhập!',
                        code: '0',
                    });
                }

                const newAccessToken = tokenGeneration.generateAccessToken(data.customer_id)
                res.cookie("accesstoken", newAccessToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "strict",
                    path: '/',
                    maxAge: 30 * 60000
                });


                req.id = data.customer_id
                next()
            });

        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Lỗi server!',
            code: '-1'
        })
    }
}

module.exports = {
    verifyAccessToken
}