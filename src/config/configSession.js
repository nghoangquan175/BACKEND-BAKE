import session from "express-session";

const configSession = (app) => {
    app.use(session({
        secret: 'super-secret-key', // Khóa bí mật để mã hóa session
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Đặt thành `true` nếu dùng HTTPS
    }))
}

export default configSession