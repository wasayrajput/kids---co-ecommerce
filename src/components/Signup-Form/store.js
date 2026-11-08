import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import taskReducer from '../Slices/taskSlice'
import adminReducer from '../Slices/adminSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        tasks: taskReducer,
        admin: adminReducer,
    },
});