import bcrypt from "bcrypt"
import sql from "mssql"
import jwt from "jsonwebtoken"
import 'dotenv/config'

const loginStaff = async (req, res) => {
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

const logoutStaff = (req, res) => {
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

module.exports = {
    loginStaff,
    logoutStaff
}