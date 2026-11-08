const Task = require('../models/taskSchema');



exports.getTasks = async (req, res) => {
    try {

        if (req.user && req.user.id) {
            const userId = req.user.id;
            
            const myTasks = await Task.find({ userId: userId }).sort({ createdAt: -1 });
            return res.json({totalYourTasks: myTasks.length, data: myTasks});
        }

        const totalTasks = await Task.countDocuments();
        return res.json({totalTasksInSystem: totalTasks, message: "Login to see your private tasks."});

    } catch (err) {
        res.status(500).json({status: "Error", message: "Data fetching failed", details: err.message });
    }
};





exports.createTask = async (req, res) => {
    try{
        const newTask = new Task ({
            task: req.body.task,
            status: req.body.status,
            priority: req.body.priority,
            deadline: req.body.deadline,
            userId: req.user.id
        });

        await newTask.save();
        res.json({message: "Task Added Successfully", task: newTask});
    }
    catch(error){
        res.status(500).json({error: "Task was no added", details: error.message});
    }
};


exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.id; // URL se Task ID
        const userId = req.user.id;   // Token se User ID
        const updates = req.body;

        const task = await Task.findOneAndUpdate(
            { _id: taskId, userId: userId }, 
            updates, 
            { new: true}
        );

        if (!task) {
            return res.status(404).json({message: "Task not found or you are not authorized to update this task."});
        }

        res.status(200).json({ message: "Task updated successfully!", task });

    } catch (err) {
        res.status(500).json({ message: "Error updating task", error: err.message });
    }
};


exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id; // URL se Task ID
        const userId = req.user.id;   // Token se User ID

        const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId: userId });

        if (!deletedTask) {return res.status(404).json({message: "Task not found"});
        }

        res.status(200).json({ message: "Task deleted successfully!" });

    } catch (err) {
        res.status(500).json({ message: "Error deleting task", error: err.message });
    }
};