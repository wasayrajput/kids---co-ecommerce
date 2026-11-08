require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');



connectDB();
app.use(express.json());
app.use(cors());

// Routes use krna
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);



const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});