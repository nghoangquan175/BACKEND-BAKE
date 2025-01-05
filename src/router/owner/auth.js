import express from 'express'

import {
    loginStaff,
    logoutStaff
} from "../../controller/owner/authController"

const router = express.Router();

router.post("/login", loginStaff)
router.post("/logout", logoutStaff)

export default router