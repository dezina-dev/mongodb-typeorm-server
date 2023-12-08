import express from 'express';
const productController = require('../controllers/product.controller')

const router = express.Router();

router.post('/add-product', productController.addProduct);
router.get('/get-product/:id', productController.getProductsByCustomerId);
router.get('/get-products', productController.getProducts);


export default router;
