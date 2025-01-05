import bcrypt from "bcrypt"
import sql from "mssql"
import jwt from "jsonwebtoken"
import 'dotenv/config'

import tokenGeneration from '../../function/tokenGeneration'

const registerNewuser = async (rawData) => {
    try {
        let { username, email, phoneNumber, password } = rawData

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        await sql.query`
            INSERT INTO Customers (username, email, phone_number, password_hash)
            VALUES (${username}, ${email}, ${phoneNumber}, ${hash})
        `
        return {
            message: "Đăng ký thành công!",
            code: '1',
            data: ''
        }
    } catch (error) {
        if (error.originalError?.info?.number === 2627) {
            return {
                message: "Email hoặc Số điện thoại đã tồn tại!",
                code: '0',
                data: ''
            };
        }
    }
}

const loginUser = async (rawData) => {
    try {
        let { email, phoneNumber, password } = rawData
        let result = await sql.query`
                SELECT customer_id, username, password_hash
                FROM Customers
                WHERE email = ${email} OR phone_number = ${phoneNumber}
            `
        if (result.recordset.length === 0) {
            return {
                message: email ? "Email hoặc Mật khẩu sai!" : "Số điện thoại hoặc mật khẩu sai!",
                code: '0',
                data: ''
            }
        }

        const { password_hash, username, customer_id } = result.recordset[0];
        const isMatch = bcrypt.compareSync(password, password_hash);
        if (!isMatch) {
            return {
                message: email ? "Email hoặc Mật khẩu sai!" : "Số điện thoại hoặc mật khẩu sai!",
                code: '0',
                data: ''
            };
        }

        const accesstoken = tokenGeneration.generateAccessToken(customer_id)
        const refreshtoken = tokenGeneration.generateRefreshToken(customer_id)
        return {
            message: 'Đăng nhập thành công!',
            code: '1',
            data: {
                accesstoken,
                refreshtoken,
                username
            }
        }
    } catch (error) {
        return {
            message: 'Lỗi server!',
            code: '-1',
        }
    }
}




module.exports = {
    registerNewuser,
    loginUser
}