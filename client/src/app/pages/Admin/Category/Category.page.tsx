import { AddCategoryConnector } from './connectors/AddCategory.connector'
import { CategoryListConnector } from './connectors/CategoryList.connector'
import { FC } from 'react'
import { Typography } from 'antd'

const { Title } = Typography

const CategoryPage: FC = () => (
    <div className="mx-5 h-full overflow-auto">
        <Title level={2}>Categories</Title>
        <CategoryListConnector/>
        <AddCategoryConnector/>
    </div>
)

export default CategoryPage
