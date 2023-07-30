import { FC } from 'react'
import { useGetAllCategoriesQuery } from '~/store/api/mainApi'

const CategoryPage: FC = () => {
    const { data: categories, isLoading, isError } = useGetAllCategoriesQuery()

    return (
        <pre>
            {JSON.stringify({ categories, isLoading, isError }, null, 2)}
        </pre>
    )
}

export default CategoryPage
