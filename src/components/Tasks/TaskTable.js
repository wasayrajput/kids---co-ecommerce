import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, removeTask, addTask, updateTask } from '../Slices/taskSlice';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './TaskTable.css';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaBackward } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const taskSchema = Yup.object({
        task: Yup.string().required("Task name is required"),
        status: Yup.string().required("Status is required"),
        priority: Yup.string().required("Priority is required"),
        deadline: Yup.date().required("Deadline is required"),
    });

    const initialValues = {
       task: '',
       status: 'Pending',
       priority: 'Medium',
       deadline: ''
    };


const TaskTable = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items = useSelector((state) => state.tasks.items || []);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(25);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const getTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5005/tasks/get-task', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                dispatch(fetchTasks(response.data.data)); // Redux store bhar diya
            } catch (err) {
                console.log("Error fetching tasks");
            }
        };
        getTasks();
    }, [dispatch]);


    const { values, errors, touched, handleChange, handleBlur, handleSubmit, setValues, resetForm} = useFormik({
        initialValues,
        validationSchema: taskSchema,
        enableReinitialize: true,

        onSubmit: async (values, actions) => {
           try {
               const token = localStorage.getItem('token');
        
               if (isEditMode) {
                const response = await axios.put(`http://localhost:5005/tasks/update-task/${currentId}`, {
                   task: values.task,
                   status: values.status,
                   priority: values.priority,
                   deadline: values.deadline
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            dispatch(updateTask(response.data.task));
            toast.success("Task Updated! 🎉");

        } else {
            const response = await axios.post('http://localhost:5005/tasks/add-task', {
                task: values.task,
                status: values.status,
                priority: values.priority,
                deadline: values.deadline
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            dispatch(addTask(response.data.task));
            toast.success("Task Created! 🚀");
        }

        handleClose();
        actions.resetForm();

    } catch (err) {
        const backendError = err.response?.data?.message || "Operation failed";
        toast.error(backendError);
    }
}
    });

    const handleDelete = async (id) => {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5005/tasks/delete-task/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                dispatch(removeTask(id));
                toast.success("Task Deleted!");
            } catch (err) {
                toast.error("Delete failed");
            }
        };

    const handleCreateNew = () => {
        setIsEditMode(false);
        setCurrentId(null);
        resetForm();
        setShowModal(true);
   };


    const handleEdit = (item) => {
        setIsEditMode(true);
        setCurrentId(item._id);
        setValues({
            task: item.task,
            status: item.status,
            priority: item.priority,
            deadline: item.deadline.split('T')[0]
        });
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setIsEditMode(false);
        setCurrentId(null);
        resetForm();
    };


    const filteredItems = items.filter((item) =>
        item.task.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    
    const currentRecords = filteredItems.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(filteredItems.length / recordsPerPage);

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth'});
}, [currentPage]);


    return (
        <div className="task-container">
            <div className="task-header">
                <h2>Project <span>Tasks</span></h2>
                <div className="search-container">
        <input
           type="text"
           placeholder="Search by task name..."
           className="search-input"
           value={searchTerm}
           onChange={(e) => {
             setSearchTerm(e.target.value);
             setCurrentPage(1);
        }}
    />
    {searchTerm && (
        <button className="clear-search" onClick={() => setSearchTerm("")}>×</button>
    )}
</div>
                <button className="btn-add-task" onClick={handleCreateNew}>
                    <IoIosAddCircleOutline className='add-btn'/> Create Task
                </button>
            </div>

            <div className="table-wrapper">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Task</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Deadline</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((item, index) => (
                            <tr key={item._id}>
                                <td>{items.length - (indexOfFirstRecord + index)}</td>
                                <td><strong>{item.task}</strong></td>
                                <td>{item.status}</td>
                                <td>{item.priority}</td>
                                <td>{new Date(item.deadline).toLocaleDateString()}</td>
                                <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}</td>
                                <td>
                                    <button className='edit-btn-custom' onClick={() => handleEdit(item)}>Edit</button>
                                    <button className='delete-link' onClick={() => dispatch(removeTask(item._id))}><MdDelete style={{marginBottom: '-1px', marginRight:'3px'}} />Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination-container">
    {/* <div className="pagination-info">
    Showing {filteredItems.length > 0 ? indexOfFirstRecord + 1 : 0} to {Math.min(indexOfLastRecord, filteredItems.length)} of {filteredItems.length} tasks
</div> */}

    <div className="pagination-buttons">
        <button className="pagi-btn" 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(currentPage - 1)}>
        <FaBackward />
        </button>

        <span className="page-number">Page {currentPage} of {nPages || 1}</span>

        <button className="pagi-btn" disabled={currentPage === nPages || nPages === 0} onClick={() => setCurrentPage(currentPage + 1)}>
            <TbPlayerTrackNextFilled />
        </button>
    </div>
</div>

            {showModal && (
                <div className="modal-overlay">
                    <form className="modal-card" onSubmit={handleSubmit}>
                        <h3>{isEditMode ? "Update Task" : "Add New Task"}</h3>
                        
                        <label>Task Name</label>
                        <input 
                            type="text"
                            name="task"
                            placeholder='Add Task Name'
                            value={values.task}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.task && touched.task && <p className="form-error">{errors.task}</p>}

                        <label>Status</label>
                        <select name="status" value={values.status} onChange={handleChange}>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>

                        <label>Priority</label>
                        <select name="priority" value={values.priority} onChange={handleChange}>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>

                        <label>Deadline</label>
                        <input 
                            type="date"
                            name="deadline"
                            value={values.deadline}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.deadline && touched.deadline && <p className="form-error">{errors.deadline}</p>}

                        <div className="modal-actions">
                            <button type="button" onClick={handleClose}>Cancel</button>
                            <button type="submit">{isEditMode ? "Update" : "Save"}</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TaskTable;