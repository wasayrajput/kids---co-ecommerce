const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
const validateInput = require('../middleware/validator');
const auth = require('../middleware/auth');


router.get('/all-users', auth, adminController.getAllUsers);
router.get('/user-tasks/:id', auth, adminController.getUserTasks);
router.delete('/delete-user/:id', auth, adminController.deleteUser);

router.put('/update-task/:id', auth, adminController.updateTask);
router.delete('/delete-task/:id', auth, adminController.deleteTask);

module.exports = router;