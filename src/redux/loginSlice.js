import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";


const decodedToken = localStorage.getItem("token") ? jwtDecode(localStorage.getItem("token")) : null;

const currentDate = new Date()

const initialState = {
    isLoggedIn: currentDate < new Date(decodedToken?.exp * 1000),
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.isLoggedIn = null
            localStorage.clear()
        }
    }
})

export const logState = state => state.loginState.isLoggedIn;
export const {login, logout} = loginSlice.actions;
export default loginSlice.reducer;