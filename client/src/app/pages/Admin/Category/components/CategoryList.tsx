import { Avatar, Button, List, Popconfirm } from 'antd'
import { Category } from '~/store/api/mainApi'
import { FC } from 'react'

type Props = {
    isLoading: boolean
    categories: Category[]
    onEdit: (categoryId: string) => void
    onDelete: (categoryId: string) => void
}

export const CategoryList: FC<Props> = ({ categories, isLoading, onEdit, onDelete }) => (
    <List
        loading={isLoading}
        dataSource={categories}
        renderItem={(item) => (
            <List.Item actions={[
                <Button onClick={() => onEdit(item._id)} key="edit" type="text">Edit</Button>,
                <Popconfirm
                    key="delete" title="Delete the position" okText="Yes" cancelText="No"
                    description="Are you sure to delete this category?"
                    onConfirm={() => onDelete(item._id)}
                >
                    <Button type="text" danger>Delete</Button>
                </Popconfirm>,
            ]}>
                <List.Item.Meta
                    avatar={<Avatar src={'http://localhost:3400/' + item.imageSrc} />}
                    title={item.name} description={item.description || 'Description is not provided'}
                />
            </List.Item>
        )}
    />
)
