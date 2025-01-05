import express from 'express'

import {
    createNewProduct,
    showProducts,
    showProductDetail,
    updateProduct,
    deleteProduct
} from '../../controller/owner/professionController';

const router = express.Router();

router.post("/product/create", createNewProduct)
router.post("/products", showProducts)
router.post("/product/detail", showProductDetail)
router.post("/product/update", updateProduct)
router.post("/product/delete", deleteProduct)


export default router