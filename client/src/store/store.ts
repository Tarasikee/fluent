import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { authApi } from './api/authApi'
import { mainApi } from './api/mainApi'
import { userApi } from './api/userApi'

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [mainApi.reducerPath]: mainApi.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
            authApi.middleware, userApi.middleware, mainApi.middleware,
        ]),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
