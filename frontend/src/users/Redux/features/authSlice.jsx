import { createSlice } from "@reduxjs/toolkit"; 
import { useNavigate } from "react-router-dom"; 

const initialState = {

    isLoggedIn:false,
    user:null

}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            const { payload } = action;
            state.isLoggedIn = true;
            state.user = payload;
        },


        logout(state) {
            state.isLoggedIn = false;
            state.user =null;
        },
    },
})


export const { login,logout } = authSlice.actions;

export default authSlice;