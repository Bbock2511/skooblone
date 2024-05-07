import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    userLoading: null, 
    userName: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserLoading: (state, action) => {
            state.userLoading = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        }
    }
})

export const { setUser, setUserLoading, setUserName, logout } = userSlice.actions;

export default userSlice.reducer;