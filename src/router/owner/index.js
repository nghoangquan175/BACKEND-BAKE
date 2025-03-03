import express from 'express'

import authController from "../../controller/owner/authController"
import homeController from "../../controller/owner/homeController"
import productController from "../../controller/owner/productController"
import customerController from "../../controller/owner/customerController"
import staffController from "../../controller/owner/staffController"
import orderController from "../../controller/owner/orderController"

import verifyStaff from '../../middleware/verifyStaff'

const router = express.Router();

//Auth
router.route('/login')
    .get(authController.showLoginForm)
    .post(authController.loginStaff)

router.get('/logout', verifyStaff, authController.logoutStaff)

// Home
router.get('/home', verifyStaff, homeController.home)

//Product
router.get('/get-products', verifyStaff, productController.showProducts)
router.get('/create-product', verifyStaff, productController.showCreateProducForm)
router.post('/save-product', verifyStaff, productController.saveNewProduct)

//Customer
router.get('/get-customers', verifyStaff, customerController.showCustomers)

//Order
router.get('/get-orders', verifyStaff, orderController.showOrders)

//Staff
router.get('/get-staffs', verifyStaff, staffController.showStaffs)


export default router