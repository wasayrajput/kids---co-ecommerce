import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        users: [],               // Saare users ki list rakhne ke liye
        userTasks: [],   // Kisi ek user ke tasks save karne ke liye
        status: 'idle',
        error: null
    },

    reducers: {
        fetchUsers: (state, action) => {
            state.users = action.payload;
        },

        // 5. Agar main table se poora user hi delete karna par jaye
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user._id !== action.payload);
        },

        // 2. Kisi ek user ke saare tasks ko array mein bharne ke liye
        fetchUserTasks: (state, action) => {
            state.userTasks = action.payload;
        },

        // 3. Task update karne ke liye (Aapka copy-to-copy taskSlice wala index pattern)
        updateUserTask: (state, action) => {
            const index = state.userTasks.findIndex(task => task._id === action.payload._id);
            if (index !== -1) {
                state.userTasks[index] = action.payload;
            }
        },

        // 4. Task remove karne ke liye (Filter pattern)
        removeUserTask: (state, action) => {
            state.userTasks = state.userTasks.filter(task => task._id !== action.payload);
        },

    }
});

// Saare plain actions ko bahar export kiya taake component mein use ho sakein
export const { 
    fetchUsers, 
    removeUser, 
    fetchUserTasks, 
    updateUserTask,
    removeUserTask 
} = adminSlice.actions;

export default adminSlice.reducer;