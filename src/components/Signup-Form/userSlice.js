import { createSlice } from '@reduxjs/toolkit';


const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const storedToken = localStorage.getItem('token') || null;

const initialState = {
  user: storedUser,
  token: storedToken,
  loggedIn: storedToken ? true : false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signup: (state, action) => {
      console.log(46, action.payload);
      state.user = {

        username: action.payload.username,
        email: action.payload.email,
        type: action.payload.type
      };
      state.loggedIn = true;
      state.token = action.payload.token;


      localStorage.setItem('user', JSON.stringify({
        username: action.payload.username,
        email: action.payload.email,
        type: action.payload.type
      }));
      
      if (action.payload.token) {
        localStorage.setItem('token', action.payload.token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.loggedIn = false;
      state.token = null;

      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { signup, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;