import {combineReducers} from "redux";
import userSlice from "./reducers/userReducer";
import toastSlice from "./reducers/toastReducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    userSlice, toastSlice,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
