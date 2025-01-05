import bcrypt from "bcrypt"
import sql from "mssql"
import jwt from "jsonwebtoken"
import 'dotenv/config'

import authCustomer from "../../service/customer/authCustomer"
import tokenGeneration from "../../function/tokenGeneration"

const registerUser = async (req, res) => {
    try {
        console.log(req.body);
        if (!req.body.username || !req.body.phoneNumber || !req.body.email || !req.body.password) {
            console.log(1);
            return res.status(400).json({
                message: 'mising body!',
                code: '-1',
                data: ''
            })
        }

        const result = await authCustomer.registerNewuser(req.body)

        return res.status(200).json({
            message: result.message,
            code: result.code,
            data: result.data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi server!',
            code: '-1',
            data: ''
        })
    }
}

const loginUser = async (req, res) => {
    try {
        if ((!req.body.phoneNumber && !req.body.email) || !req.body.password) {
            return res.status(400).json({
                message: 'mising body!',
                code: '-1',
                data: ''
            })
        }

        const result = await authCustomer.loginUser(req.body)
        res.cookie("refreshtoken", result.data.refreshtoken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
            maxAge: (7 * 24 * 60 * 60 * 1000)
        })

        return res.status(200).json({
            message: result.message,
            code: result.code,
            data: {
                accesstoken: result.data.accesstoken,
                username: result.data.username
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Loi server!',
            code: '-1',
        })
    }
}

const autoLogin = async (req, res) => {
    try {
        const customer_id = req.id
        await sql.query`
            SELECT *
            FROM Customers
            WHERE customer_id = ${customer_id}
        `
        res.status(200).json({
            message: 'Dang nhap thanh cong!',
            code: '1',
        })
    } catch (error) {
        res.status(500).json("Loi server!")
    }
}

const logoutUser = (req, res) => {
    try {
        res.clearCookie("accesstoken", {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
        });

        res.clearCookie("refreshtoken", {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
        });

        return res.status(200).json({
            message: "Đăng xuất thành công!",
            code: '1',
        });
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server!",
            code: '-1'
        });
    }
}



// const requestRefreshToken = async (req, res) => {
//     const refreshtoken = req.cookies.refreshtoken
//     if (!refreshtoken) return res.status(401).json({
//         message: 'Ban phai dang nhap!',
//         code: '0',
//         data: ''
//     })

//     jwt.verify(refreshtoken, process.env.SECRETKEY, (err, id) => {
//         if (err) {
//             return res.status(403).json({
//                 message: 'Ban phai dang nhap!',
//                 code: '0',
//                 data: ''
//             });
//         }

//         let newAccesstoken = generateAccessToken(id)
//         let newRefreshtoken = generateRefreshToken(id)
//         res.cookie("refreshtoken", newRefreshtoken, {
//             httpOnly: true,
//             secure: false,
//             sameSite: 'strict',
//             path: '/',
//         })

//         return res.status(200).json({
//             message: 'Ban phai dang nhap!',
//             code: '1',
//             data: newAccesstoken
//         })
//     })
// }

module.exports = {
    registerUser,
    loginUser,
    autoLogin,
    logoutUser
}