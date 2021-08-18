const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
    taskDate: {
        type: Date,
        default: Date.now
    },
    taskTitle: {
        type: String,
        required: true,
        unique: false,
    },
    taskContent: {
        type: String,
        required: true,
        unique: false,
    },
    taskExpireTime: {
        type: Date,
        required: true,
        unique: false,
        // validate the eppire date is  not in the past
        validate(){
            if(this.taskDate < Date.now()){
                throw new Error('The date cannot be in the past');
            }
        }
    },
});


module.exports = Task;