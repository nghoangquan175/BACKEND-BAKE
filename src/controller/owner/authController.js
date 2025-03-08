import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"
import 'dotenv/config'

import authRepository from '../../repositories/owner/authRepository'

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

    const user = await authRepository.handleLoginStaff(username, password)


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

    res.redirect('/create-product');
}

const logoutStaff = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error clearing session:', err);
            return res.status(500).send('Không thể logout!');
        }
        res.redirect('/login');
    });
}

module.exports = {
    showLoginForm,
    loginStaff,
    logoutStaff
}