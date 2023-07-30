import { ServerResponse } from '~/common/types'
import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

type LoginResponse = {
    token: string
}

type Credentials = {
    email: string
    password: string
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3400/api/',
    }),
    endpoints: builder => ({
        login: builder.mutation<ServerResponse<LoginResponse>, Credentials>({
            query: credentials => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation<ServerResponse<void>, Credentials>({
            query: credentials => ({
                url: 'auth/register',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
})

export const {
    useLoginMutation,
    useRegisterMutation,
} = authApi
