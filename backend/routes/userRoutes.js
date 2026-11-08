const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateInput = require('../middleware/validator');
const auth = require('../middleware/auth');


router.post('/sign-up', validateInput, userController.signUp);
router.get('/all', auth, userController.getUsers);
router.get('/single/:id', auth, userController.getUsers);
router.put('/update-user', auth, validateInput, userController.updateUser);
router.post('/login', validateInput, userController.login);
router.post('/forgot-password', validateInput, userController.forgotPassword);
router.post('/reset-password', validateInput, userController.resetPassword);
router.delete('/delete-account/:id', auth, userController.deleteUserAccount);

module.exports = router;