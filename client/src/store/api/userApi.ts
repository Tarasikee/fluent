import { ServerResponse } from '~/common/types'
import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from '~/store/api/customBaseQuery'

export type User = {
    _id: string
    email: string
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: customBaseQuery,
    endpoints: builder => ({
        check: builder.query<ServerResponse<User>, void>({
            query: () => 'auth/check',
        }),
    }),
})

export const {
    useCheckQuery,
} = userApi
