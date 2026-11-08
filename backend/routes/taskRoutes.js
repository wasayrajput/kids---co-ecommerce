const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require ('../middleware/auth');
const authOptional = require('../middleware/authOptional');
const validateInput = require('../middleware/validator');

// Routes define krna
router.get('/get-task', authOptional, taskController.getTasks);
// router.get('/get-task/:id', auth, taskController.getAllTasks);
router.post('/add-task', auth, taskController.createTask);
router.put('/update-task/:id', auth, validateInput, taskController.updateTask);
router.delete('/delete-task/:id', auth, taskController.deleteTask);


module.exports = router;
