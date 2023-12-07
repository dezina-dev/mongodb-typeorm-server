import express from 'express';
const userController = require('../controllers/user.controller')

const router = express.Router();

router.get('/get-all-users', userController.getAllUsers);
router.get('/get-user/:id', userController.getUserById);
router.post('/create-user', userController.createUser);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);


export default router;
