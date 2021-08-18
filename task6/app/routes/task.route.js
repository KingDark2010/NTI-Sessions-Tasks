const express = require('express');
const router = new express.Router();
const taskController = require('../controller/task.controller');

router.post('/', taskController.addTask);
router.get('/all', taskController.getAllTasks);
router.get('/:id', taskController.getTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;