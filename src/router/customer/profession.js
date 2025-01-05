import express from 'express'

import { showProducts } from '../../controller/customer/professionController';

const router = express.Router();

router.post("/products", showProducts)

export default router