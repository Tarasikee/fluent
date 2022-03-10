import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {ICategory} from "../interfaces/ICategory";
import {IPosition} from "../interfaces/IPosition";
import {IOrder} from "../interfaces/IOrder";
import {IBasketItem} from "../interfaces/IBasketItem";
import {IOverview} from "../interfaces/IOverview";
import {IAnalytics} from "../interfaces/IAnalytics";
import {userSlice} from "./reducers/userReducer";

const authQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');

        if (token) {
            headers.set('authorization', token);
        }

        return headers;
    },
});

const baseQueryWithLogout: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    const result = await authQuery(args, api, extraOptions);

    if (result.error && (result.error as any).originalStatus === 401) {
        api.dispatch(userSlice.actions.logout());
        localStorage.removeItem('token');
    }

    return result;
};


export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithLogout,
    tagTypes: ['Categories', 'Positions', 'Orders'],
    endpoints: (build) => ({
        fetchAllCategories: build.query<ICategory[], void>({
            query: () => '/category',
            providesTags: (result) =>
                result
                    ? [...result.map(({_id}) => ({type: 'Categories' as const, id: _id})), {
                        type: 'Categories',
                        id: 'LIST'
                    }]
                    : [{type: 'Categories', id: 'LIST'}]
        }),
        fetchSingleCategory: build.query<ICategory, string>({
            query: (id) => `category/${id}`,
            transformResponse: (rawResult: ICategory[]) => {
                return rawResult[0];
            },
            providesTags: (result, error, id) => [{type: 'Categories', id}],
        }),
        createCategory: build.mutation<ICategory, { name: string; image: File; }>({
            query: ({name, image}) => {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('image', image, image.name);

                return {
                    url: 'category',
                    method: 'POST',
                    body: formData
                };
            },
            invalidatesTags: ['Categories'],
        }),
        updateCategory: build.mutation<ICategory, { id: string; name: string; image?: File; }>({
            query: ({id, name, image}) => {
                const formData = new FormData();
                formData.append('name', name);

                if (image) {
                    formData.append('image', image, image.name);
                }

                return {
                    url: `category/${id}`,
                    method: 'PATCH',
                    body: formData
                };
            },
            invalidatesTags: (result, error, arg) => [{type: 'Categories', id: arg.id}],
        }),
        deleteCategory: build.mutation<void, { id: string }>({
            query: ({id}) => ({
                url: `category/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Categories'],
        }),

        fetchPositionsByCategory: build.query<IPosition[], string>({
            query: (id) => `position/${id}`,
            providesTags: ['Positions']
        }),
        createPosition: build.mutation<IPosition, { name: string; cost: number; category: string; }>({
            query: (body) => ({
                url: 'position',
                method: "POST",
                body
            }),
            invalidatesTags: ['Positions'],
        }),
        updatePosition: build.mutation<IPosition, { _id: string; name?: string; cost?: number; category?: string; }>({
            query: ({_id, ...body}) => ({
                url: `position/${_id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ['Positions'],
        }),
        deletePosition: build.mutation<void, { _id: string; }>({
            query: ({_id}) => ({
                url: `position/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Positions'],
        }),

        fetchOrders: build.query<IOrder[], { order?: string; start?: string; end?: string }>({
            query: ({order, start, end}) => ({
                url: 'order',
                params: {
                    order, start, end,
                    limit: 100
                }
            }),
            keepUnusedDataFor: 0,
            providesTags: ['Orders']
        }),
        createOrder: build.mutation<IOrder, IBasketItem[]>({
            query: (cart) => ({
                url: 'order',
                method: "POST",
                body: {
                    list: cart.map(({name, quantity, cost}) => ({name, quantity, cost}))
                }
            }),
            invalidatesTags: ['Orders'],
        }),


        //Analytics
        fetchOverview: build.query<IOverview, void>({
            query: () => 'analytics/overview',
            keepUnusedDataFor: 0
        }),
        fetchAnalytics: build.query<IAnalytics, void>({
            query: () => 'analytics/analytics',
            keepUnusedDataFor: 0
        }),
    })
});
