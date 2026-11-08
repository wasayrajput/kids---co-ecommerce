const User = require('../models/userSchema');
const Task = require('../models/taskSchema');


exports.getAllUsers = async (req, res) => {
    try {
        // CHANGE: Check karein ke request karne wala Admin hai ya nahi
        if (req.user.type !== 'admin') {
            return res.status(403).json({ message: "Access Denied!" });
        }

        const users = await User.find()
            .select('-password -otp -otpExpiry')
            .sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Users load nahi ho sakay", error: err.message });
    }
};


exports.getUserTasks = async (req, res) => {
    try {
        // CHANGE: Security check
        if (req.user.type !== 'admin') {
            return res.status(403).json({ message: "Access Denied!" });
        }

        const UserId = req.params.id;
        const tasks = await Task.find({ userId: UserId }).sort({ createdAt: -1 });
        
        res.status(200).json({
            total: tasks.length,
            tasks: tasks
        });
    } catch (err) {
        res.status(500).json({ message: "Tasks fetch karne mein error", error: err.message });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        // CHANGE: Security check
        if (req.user.type !== 'admin') {
            return res.status(403).json({ message: "Sirf Admin delete kar sakta hai!" });
        }

        const deleteUser = req.params.id;

        const user = await User.findById(deleteUser);
        if (!user) return res.status(404).json({ message: "User nahi mila" });

        // User ke tasks delete karein
        await Task.deleteMany({ userId: deleteUser });
        // User delete karein
        await User.findByIdAndDelete(deleteUser);

        res.status(200).json({ message: `User ${user.username} aur unke saare tasks delete ho gaye.` });
    } catch (err) {
        res.status(500).json({ message: "Deletion failed", error: err.message });
    }
};


// adminController.js
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { task, title, status, priority, deadline } = req.body;

        // Dono fields check kar lo (task ya title) jo bhi model mein ho
        const updatedFields = {
            task: task || title,
            title: task || title, 
            status,
            priority,
            deadline
        };

        const updatedTask = await Task.findByIdAndUpdate(
            id, 
            updatedFields, 
            { returnDocument: 'after' } // Warning se bachne ke liye
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task nahi mila bhai!" });
        }

        res.status(200).json({ 
            success: true, 
            message: "Task Updated!", 
            task: updatedTask 
        });

    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ message: "Backend par masla hai!", error: error.message });
    }
};


exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id; // URL se Task ID

        const deletedTask = await Task.findOneAndDelete({ _id: taskId});

        if (!deletedTask) {return res.status(404).json({message: "Task not found"});
        }

        res.status(200).json({ message: "Task deleted successfully!" });

    } catch (err) {
        res.status(500).json({ message: "Error deleting task", error: err.message });
    }
};