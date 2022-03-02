import {combineReducers} from "redux";
import userSlice from "./reducers/userReducer";
import toastSlice from "./reducers/toastReducer";
import basketSlice from "./reducers/basketReducer";
import {configureStore} from "@reduxjs/toolkit";
import {api} from "./api";

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    userSlice,
    toastSlice,
    basketSlice,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
            api.middleware
        )
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
