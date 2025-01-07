import express from 'express'

import {
    loginStaff,
    logoutStaff,
    showLoginForm
} from "../../controller/owner/authController"

const router = express.Router();



router.use("/login", loginStaff)

router.post("/logout", logoutStaff)

export default router