import express from 'express'

import authController from "../../controller/owner/authController"
import homeController, { home } from "../../controller/owner/homeController"

const router = express.Router();

router.route('/login')
    .get(authController.showLoginForm)
    .post(authController.loginStaff)


router.get('/home', homeController.home)

// router.post("/logout", logoutStaff)

export default router