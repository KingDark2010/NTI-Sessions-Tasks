const Task = require('../models/task.model');

const generateStatus = (apiStatus, Data, message) => {
    return {
        apiStatus,
        Data,
        message
    };
}

const addTask = async (req, res) => {
    const newTask = new Task (req.body);
    try{
        await newTask.save();
        if(newTask.length == 0){
            return res.status(500).send(generateStatus(500, {}, 'server error with Save'));
        }   
        res.status(200).send(generateStatus(200, newTask, 'Task added successfully'));
    }
    catch(e){
        res.status(500).send(generateStatus(500, e.message, "Task was not added"));
    }
}


const getTask = async (req, res) => {
    const id = req.params.id;
    try{
        const task = await Task.findById(id);
        if(!task){
            return res.status(404).send(generateStatus(404, {}, 'Task not found'));
        }
        res.status(200).send(generateStatus(200, task, 'Task found successfully'));
    }
    catch(e){
        res.status(500).send(generateStatus(500, e.message, "server error can not get user"));
    }
}

const deleteTask = async (req, res) => {
    const id = req.params.id;
    try{
        const task = await Task.findByIdAndRemove(id);
        if(!task){
            return res.status(404).send(generateStatus(404, {}, "Task was not found"));
        }
        res.status(200).send(generateStatus(200, task, 'Task deleted successfully'));
    }
    catch(e){
        res.status(500).send(generateStatus(500, e.message, "server error with Delete"));
    }
}


const updateTask = async (req, res) => {
    const id = req.params.id;
    let allowedFields = ['taskExpireTime'];
    let request = Object.keys(req.body);
    const isvalid = request.every(field => allowedFields.includes(field));
    try{
        if(!isvalid){
            return res.status(500).send(generateStatus(500, {}, 'server error Invalid fields'));
        }
        const task = await Task.findByIdAndUpdate(id, req.body, {new: true});
        if(!task){
            return res.status(404).send(generateStatus(404, {}, 'Task not found'));
        }
        res.status(200).send(generateStatus(200, task, 'Task updated successfully'));
    }
    catch(e){
        res.status(500).send(generateStatus(500, e.message, "server error with Update"));
    }
}

const getAllTasks = async (req, res) => {
    try{
        const tasks = await Task.find({});
        if(tasks.length == 0){
            return res.status(404).send(generateStatus(404, {}, 'Task not found'));
        }
        res.status(200).send(generateStatus(200, tasks, 'Tasks found successfully'));
    }
    catch(e){
        res.status(500).send(generateStatus(500, e.message, "server error with can not load data"));
    }
}
module.exports = {addTask, getTask, deleteTask, updateTask, getAllTasks}