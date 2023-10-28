import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { AlertSclice } from "./features/AlertSlice"
import { AuthSlice } from "./features/Auth/AuthSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"


const presistConfig = {
    key: 'root',
    version: 1,
    storage
}
const reducer = combineReducers({
    auth: AuthSlice.reducer,
})
const presistedReducer = persistReducer(presistConfig, reducer);
export default configureStore({
    reducer: {
        presistedReducer,
        alerts:
            AlertSclice.reducer,
    }



})