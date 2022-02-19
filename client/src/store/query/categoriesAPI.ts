import {createApi} from "@reduxjs/toolkit/dist/query/react";
import $api from "../../http";
import {ICategory} from "../../interfaces/ICategory";

export const categoriesAPI = createApi({
    reducerPath: 'categoriesAPI',
    baseQuery: $api,
    tagTypes: ['Category'],
    endpoints: (build) => ({
        fetchAllCategories: build.query<ICategory[], void>({
            query: () => '/category',
            providesTags: () => ['Category']
        })
    })
});
