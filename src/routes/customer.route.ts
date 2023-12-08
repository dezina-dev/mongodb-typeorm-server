import express from 'express';
const customerController = require('../controllers/customer.controller')

const router = express.Router();

router.get('/get-customers', customerController.getCustomers);
router.post('/create-customer', customerController.createCustomer);
router.put('/update-customer/:id', customerController.updateCustomer);
router.delete('/delete-customer/:id', customerController.deleteCustomer);


export default router;
