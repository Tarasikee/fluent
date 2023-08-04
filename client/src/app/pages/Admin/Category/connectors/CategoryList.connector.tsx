import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from '~/store/api/mainApi'
import { CategoryList } from '../components/CategoryList'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

export const CategoryListConnector: FC = () => {
    const navigate = useNavigate()

    const { data: categories, isLoading } = useGetAllCategoriesQuery()

    const [deleteCategory] = useDeleteCategoryMutation()

    function handleEdit(categoryId: string) {
        navigate('/admin/category/' + categoryId)
    }

    function handleDelete(categoryId: string) {
        const confirm = window.confirm('Are you sure to delete this category? All positions will be deleted too.')
        if (confirm) {
            deleteCategory({ id: categoryId })
        }
    }

    return <CategoryList
        categories={categories || []} isLoading={isLoading}
        onEdit={handleEdit} onDelete={handleDelete}
    />
}
