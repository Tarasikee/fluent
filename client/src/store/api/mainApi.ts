import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from '~/store/api/customBaseQuery'

export type Category = {
    _id: string
    name: string
    imageSrc: string
}

export type Position = {
    _id: string
    name: string
    cost: number
    category: string
}

export type BasketItem = {
    _id: string
    name: string
    cost: number
    quantity: number
}

export type ListItem = {
    name: string
    quantity: number
    cost: number
    _id: string
}

export type Order = {
    order: number
    list: ListItem[]
    user: string
    _id: string
    date: Date
}

export type OverviewItem = {
    percent: number
    compare: number
    yesterday: number
    isHigher: boolean
}

type OverviewKeys = 'gain' | 'orders'

export type Overview = Record<OverviewKeys, OverviewItem>

export type Chart = {
    label: string
    order: number
    gain: number
}

export type Analytics = {
    averageBill: number
    chart: Chart[]
}

export const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: customBaseQuery,
    tagTypes: ['Categories', 'Positions', 'Orders'],
    endpoints: (build) => ({
        getAllCategories: build.query<Category[], void>({
            query: () => '/category',
            providesTags: (result) =>
                result
                    ? [...result.map(({ _id }) => ({ type: 'Categories' as const, id: _id })), {
                        type: 'Categories',
                        id: 'LIST',
                    }]
                    : [{ type: 'Categories', id: 'LIST' }],
        }),
        getSingleCategory: build.query<Category, string>({
            query: (id) => `category/${id}`,
            transformResponse: (rawResult: Category[]) => {
                return rawResult[0]
            },
            providesTags: (_, __, id) => [{ type: 'Categories', id }],
        }),
        createCategory: build.mutation<Category, { name: string; image: File }>({
            query: ({ name, image }) => {
                const formData = new FormData()
                formData.append('name', name)
                formData.append('image', image, image.name)

                return {
                    url: 'category',
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Categories'],
        }),
        updateCategory: build.mutation<Category, { id: string; name: string; image?: File; }>({
            query: ({ id, name, image }) => {
                const formData = new FormData()
                formData.append('name', name)

                if (image) {
                    formData.append('image', image, image.name)
                }

                return {
                    url: `category/${id}`,
                    method: 'PATCH',
                    body: formData,
                }
            },
            invalidatesTags: (_, __, arg) => [{ type: 'Categories', id: arg.id }],
        }),
        deleteCategory: build.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Categories'],
        }),

        getPositionsByCategory: build.query<Position[], string>({
            query: (id) => `position/${id}`,
            providesTags: ['Positions'],
        }),
        createPosition: build.mutation<Position, { name: string; cost: number; category: string; }>({
            query: (body) => ({
                url: 'position',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Positions'],
        }),
        updatePosition: build.mutation<Position, { _id: string; name?: string; cost?: number; category?: string; }>({
            query: ({ _id, ...body }) => ({
                url: `position/${_id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Positions'],
        }),
        deletePosition: build.mutation<void, { _id: string; }>({
            query: ({ _id }) => ({
                url: `position/${_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Positions'],
        }),

        getOrders: build.query<Order[], { order?: string; start?: string; end?: string }>({
            query: ({ order, start, end }) => ({
                url: 'order',
                params: {
                    order, start, end,
                    limit: 100,
                },
            }),
            keepUnusedDataFor: 0,
            providesTags: ['Orders'],
        }),
        createOrder: build.mutation<Order, BasketItem[]>({
            query: (cart) => ({
                url: 'order',
                method: 'POST',
                body: {
                    list: cart.map(({ name, quantity, cost }) => ({ name, quantity, cost })),
                },
            }),
            invalidatesTags: ['Orders'],
        }),

        //Analytics
        getOverview: build.query<Overview, void>({
            query: () => 'analytics/overview',
            keepUnusedDataFor: 0,
        }),
        getAnalytics: build.query<Analytics, void>({
            query: () => 'analytics/analytics',
            keepUnusedDataFor: 0,
        }),
    }),
})

export const {
    useGetAllCategoriesQuery,
    useGetSingleCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useCreatePositionMutation,
    useUpdatePositionMutation,
    useDeletePositionMutation,
    useGetPositionsByCategoryQuery,
    useGetOrdersQuery,
    useCreateOrderMutation,
    useGetOverviewQuery,
    useGetAnalyticsQuery,
} = mainApi
