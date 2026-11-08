import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import './Admin.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, removeUser, fetchUserTasks, updateUserTask, removeUserTask } from '../Slices/adminSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaBackward } from 'react-icons/fa'; 
import { TbPlayerTrackNextFilled } from "react-icons/tb";


const taskSchema = Yup.object({
    task: Yup.string().required("Task name is required"),
    status: Yup.string().required("Status is required"),
    priority: Yup.string().required("Priority is required"),
    deadline: Yup.date().required("Deadline is required"),
});

const Admin = () => {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.admin.users);
    const userTasks = useSelector((state) => state.admin.userTasks);

   
    const [searchTerm, setSearchTerm] = useState("");
    const [showUserTask, setShowUserTask] = useState(false);
    const [showEditTask, setShowEditTask] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);


    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(25);

    const [currentPage2, setCurrentPage2] = useState(1);
    const [recordsPerPage2] = useState(25);

    const BASE_URL = "http://localhost:5005";



    const formik = useFormik({
    initialValues: { 
        task: '',
        status: 'Pending',
        priority: 'Medium',
        deadline: '' 
    },
    validationSchema: taskSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`${BASE_URL}/admin/update-task/${currentTaskId}`, values, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const updatedTask = res.data.task || res.data || { _id: currentTaskId, ...values };
            dispatch(updateUserTask(updatedTask)); 
            toast.success("Task Updated successfully! 🎉");
            setShowEditTask(false);
            formik.resetForm();
        } catch (err) {
            toast.error("Update failed!");
        }
    }
});

    // Initial fetch - Saare Users Load Karna
    const fetchAllUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${BASE_URL}/admin/all-users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            dispatch(fetchUsers(res.data)); 
        } catch (err) {
            toast.error("Users cannot be loaded!");
            console.log(err);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, [dispatch]);


    const handleViewTasks = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${BASE_URL}/admin/user-tasks/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            dispatch(fetchUserTasks(res.data.tasks)); 
            setShowUserTask(true);
        } catch (err) {
            toast.error("Tasks will not load!");
            console.log(err);
        }
    };

    
    const handleDeleteTask = async (taskId) => {
        if (window.confirm("Do you really want to delete this task?")) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${BASE_URL}/admin/delete-task/${taskId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                dispatch(removeUserTask(taskId)); 
                toast.success("Task delete ho gaya!");
            } catch (err) {
                toast.error("Problen on deleting a task");
                console.log(err);
            }
        }
    };

    // 3. Poora User Delete Karna
    const handleDeleteUser = async (userId) => {
        if (window.confirm("⚠️ Do you really want to delete this user?")) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${BASE_URL}/admin/delete-user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                dispatch(removeUser(userId)); 
                toast.success("User successfully has been deleted!");
            } catch (err) {
                toast.error("Problem occur for deleting the user");
                console.log(err);
            }
        }
    };

const handleEditTask = (task) => {
    setCurrentTaskId(task._id);
    formik.setValues({
        task: task.task || task.title || '',
        status: task.status || 'Pending',
        priority: task.priority || 'Medium',
        deadline: task.deadline ? task.deadline.split('T')[0] : ''
    });
    setShowEditTask(true);
};

const handleCloseEditModal = () => {
    setShowEditTask(false);
    setCurrentTaskId(null);
    formik.resetForm();
};


    const filteredUsers = users.filter((user) => 
        user.type?.toLowerCase() !== 'admin' && 
        (user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
         user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    
    const currentRecords = filteredUsers.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(filteredUsers.length / recordsPerPage);


    const indexOfLastRecord2 = currentPage2 * recordsPerPage2;
    const indexOfFirstRecord2 = indexOfLastRecord2 - recordsPerPage2;

    const currentRecords2 = userTasks.slice(indexOfFirstRecord2, indexOfLastRecord2);
    const nPages2 = Math.ceil(userTasks.length / recordsPerPage2);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth'});
    }, [currentPage]);


    // Render
    return (
        <div className="admin-container">
            <h2>User Management (<span>Admin Only</span>)</h2>
            
            <input 
                type="text" 
                placeholder="Search user by name or email..." 
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                }}
                className="search-bar"
            />

            <table className="user-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Tasks</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
        
                    {currentRecords.map((user, index) => (
                        <tr key={user._id}>
                            <td>{filteredUsers.length - (indexOfFirstRecord + index)}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td><span className="role-badge">{user.type}</span></td>
                            <td>
                                <button className="view-btn" onClick={() => handleViewTasks(user._id)} >
                                    View Tasks
                                </button>
                            </td>
                            <td>
                                {user.type !== 'admin' && (
                                    <button onClick={() => handleDeleteUser(user._id)} className="delete-btn">
                                        <FaTrash /> Delete User
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

                <div className="pagination-container">
                    <div className="pagination-buttons">
                        <button className="pagi-btn" 
                                disabled={currentPage === 1} 
                                onClick={() => setCurrentPage(currentPage - 1)}>
                            <FaBackward />
                        </button>
                        <span className="page-number">Page {currentPage} of {nPages || 1}</span>
                        <button className="pagi-btn" 
                                disabled={currentPage === nPages || nPages === 0} 
                                onClick={() => setCurrentPage(currentPage + 1)}>
                            <TbPlayerTrackNextFilled />
                        </button>
                    </div>
                </div>

            {showUserTask && (
                <div className="modal-overlay2" onClick={() => setShowUserTask(false)}>
                    <div className="modal-card-full" onClick={(e) => e.stopPropagation()}>
                        <div className="task-header">
                            <h2>User <span>Tasks</span></h2>
                            <button className="close-x" onClick={() => setShowUserTask(false)}>×</button>
                        </div>

                        <div className="table-wrapper modal-scroll">
                            <table className="custom-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>TASK</th>
                                        <th>STATUS</th>
                                        <th>PRIORITY</th>
                                        <th>DEADLINE</th>
                                        <th>CREATED AT</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentRecords2.map((task, index) => (
                                        <tr key={task._id}>
                                            <td>{userTasks.length - (indexOfFirstRecord2 + index)}</td>
                                            <td>{task.task || task.title}</td>
                                            <td>
                                                <span className={`status-badge ${task.status.toLowerCase().replace(" ", "-")}`}>
                                                    {task.status}
                                                </span>
                                            </td>
                                            <td>{task.priority}</td>
                                            <td>{new Date(task.deadline).toLocaleDateString()}</td>
                                            <td>{task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'N/A'}</td>
                                            <td>
                                                <div className='actions-cell'>
                                                    <button className="edit-btn-custom" onClick={() => handleEditTask(task)}>Edit Task</button>
                                                    <button className="delete-link" onClick={() => handleDeleteTask(task._id)}><FaTrash /> Delete Task</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                            <div className="pagination-container">
                                <div className="pagination-buttons">
                                    <button className="pagi-btn" 
                                            disabled={currentPage2 === 1}  
                                            onClick={() => setCurrentPage2(currentPage2 - 1)}>
                                        <FaBackward />
                                    </button>
                                    <span className="page-number">Page {currentPage2} of {nPages2 || 1}</span>
                                    <button className="pagi-btn"
                                            disabled={currentPage2 === nPages2 || nPages2 === 0} 
                                            onClick={() => setCurrentPage2(currentPage2 + 1)}>
                                        <TbPlayerTrackNextFilled />
                                    </button>
                                </div>
                            </div>
                    
                    </div>
                </div>
            )}

            {showEditTask && (
                <div className="edit-popup-overlay" onClick={handleCloseEditModal}>
                    <div className="edit-popup-card" onClick={(e) => e.stopPropagation()}>
                        <h3 className="popup-title">Update Task</h3>
                        <form onSubmit={formik.handleSubmit}>
    <div className="form-group">
        <label>Task Name</label>
        <input 
            type="text" 
            name="task"
            value={formik.values.task} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
        />
        {formik.errors.task && formik.touched.task && <p style={{color: 'red', fontSize: '12px'}}>{formik.errors.task}</p>}
    </div>

    <div className="form-group">
        <label>Status</label>
        <select name="status" value={formik.values.status} onChange={formik.handleChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
        </select>
    </div>

    <div className="form-group">
        <label>Priority</label>
        <select name="priority" value={formik.values.priority} onChange={formik.handleChange}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        </select>
    </div>

    <div className="form-group">
        <label>Deadline</label>
        <input 
            type="date" 
            name="deadline"
            value={formik.values.deadline} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
        />
        {formik.errors.deadline && formik.touched.deadline && <p style={{color: 'red', fontSize: '12px'}}>{formik.errors.deadline}</p>}
    </div>

    <div className="popup-actions">
        <button type="button" className="btn-cancel" onClick={handleCloseEditModal}>Cancel</button>
        <button type="submit" className="btn-update">Update</button>
    </div>
</form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;