import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user";
import stateReducer from "../slices/state";


export default configureStore({
    reducer: {
        user: userReducer,
        state: stateReducer
    }
})