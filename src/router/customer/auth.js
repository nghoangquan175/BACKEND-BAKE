import express from 'express'

import { registerUser, loginUser, autoLogin, logoutUser } from '../../controller/customer/authController';
import { verifyAccessToken } from "../../controller/customer/tokenMWController"

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/autoLogin", verifyAccessToken, autoLogin)
router.post("/logout", logoutUser)

export default router