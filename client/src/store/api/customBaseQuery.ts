import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { message } from 'antd'
import storageToken from '~/common/storageToken'

const authQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3400/api/',
    prepareHeaders: (headers) => {
        const token = storageToken.get()

        if (token) {
            headers.set('authorization', token)
        }

        return headers
    },
})

export const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    const result = await authQuery(args, api, extraOptions)

    if (result.error && (result.error as { originalStatus: number }).originalStatus === 401) {
        storageToken.remove()
    }

    return result
}
