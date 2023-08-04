import { Position, useDeletePositionMutation, useGetPositionsByCategoryQuery, useUpdatePositionMutation } from '~/store/api/mainApi'
import { App } from 'antd'
import { FC } from 'react'
import { OrdersListEditable } from '../components/OrdersListEditable'
import { useParams } from 'react-router-dom'

export const OrdersListEditableConnector: FC = () => {
    const { categoryId } = useParams()
    const { message } = App.useApp()

    const { data, isLoading } = useGetPositionsByCategoryQuery(String(categoryId))

    const [deletePosition] = useDeletePositionMutation()
    const [updatePosition] = useUpdatePositionMutation()

    async function handleDeletePosition(id: string) {
        try {
            await deletePosition({ _id: id })
            message.success({ content: 'Position deleted' })
        } catch (e) {
            message.error({ content: 'Something went wrong, try again later' })
        }
    }

    async function handleUpdatePosition(newPosition: Position) {
        try {
            await updatePosition(newPosition)
            message.success({ content: 'Position updated' })
        } catch (e) {
            message.error({ content: 'Something went wrong, try again later' })
        }
    }

    return <OrdersListEditable
        isLoading={isLoading}
        positions={data ?? []}
        onDeletePosition={handleDeletePosition}
        onUpdatePosition={handleUpdatePosition}
    />
}
