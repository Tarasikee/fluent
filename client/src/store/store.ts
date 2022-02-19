import {combineReducers} from "redux";
import userSlice from "./reducers/userReducer";
import toastSlice from "./reducers/toastReducer";
import {configureStore} from "@reduxjs/toolkit";
import {categoriesAPI} from "./query/categoriesAPI";

const rootReducer = combineReducers({
    [categoriesAPI.reducerPath]: categoriesAPI.reducer,
    userSlice,
    toastSlice,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
            categoriesAPI.middleware
        )
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
