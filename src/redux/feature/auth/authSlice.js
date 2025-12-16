import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    role: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { role, token } = action.payload;
        
            state.role = role;
            state.token = token;
        },
        logout: (state) => {
            state.role = null;
            state.token = null;
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state) => state.auth.token;
export const useCurrentRole = (state) => state.auth.role;