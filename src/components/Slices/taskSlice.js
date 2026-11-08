import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },

    reducers: {
        fetchTasks: (state, action) => {
            state.items = action.payload;
        },

        addTask: (state, action) => {
            state.items.unshift(action.payload);
        },

        updateTask: (state, action) => {
            const index = state.items.findIndex(task => task._id === action.payload._id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },

        removeTask: (state, action) => {
            state.items = state.items.filter(task => task._id !== action.payload);
        }
    }
});

export const { fetchTasks, addTask, updateTask, removeTask } = taskSlice.actions;

export default taskSlice.reducer;