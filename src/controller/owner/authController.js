import bcrypt from "bcrypt"
import sql from "mssql"
import jwt from "jsonwebtoken"
import 'dotenv/config'

const showLoginForm = async (req, res) => {
    res.render('login', { layout: 'login' });
}


const loginStaff = async (req, res) => {
    const { username, password } = req.body;
    const errors = {};

    // Kiểm tra dữ liệu đầu vào
    if (!username || username.trim() === '') {
        errors.username = 'Tên đăng nhập trống!';
    }
    if (!password || password.trim() === '') {
        errors.password = 'Mật khẩu trống!';
    }

    if (Object.keys(errors).length > 0) {
        return res.render('login', {
            layout: 'login',
            errors,
            username
        });
    }

    const user = await sql.query`
                    SELECT staff_id, staff_name, staff_role
                    FROM Store_Users
                    WHERE staff_name = ${username} and staff_password = ${password}
                `

    if (!user?.recordset[0]) {
        return res.render('login', {
            layout: 'login',
            message: 'Tên đăng nhập hoặc mật khẩu sai!',
            username
        });
    }

    req.session.user = {
        id: user.recordset[0].staff_id,
        name: user.recordset[0].staff_name,
        role: user.recordset[0].staff_role
    };

    res.redirect('/home');
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
    showLoginForm,
    loginStaff,
    logoutStaff
}