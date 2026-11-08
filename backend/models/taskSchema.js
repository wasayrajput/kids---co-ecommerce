const mongoose = require('mongoose');


  const taskSchema = new mongoose.Schema({
    task: String,
    status: { type: String, default: 'Pending' },
    priority: String,
    deadline: String,
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
}, {timestamps: true}
);

module.exports = mongoose.model('Task', taskSchema);