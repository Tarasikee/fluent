import { Button, Form, List, Popconfirm, Space, Typography } from 'antd'
import { FC, useState } from 'react'
import { FormPositionData, PositionModalForm } from './PositionModalForm'
import { Position } from '~/store/api/mainApi'

const { Paragraph } = Typography

export const ListItem: FC<{
    item: Position,
    onDeletePosition: (id: string) => void
    onUpdatePosition: (newPosition: Position) => void
}> = ({ item, onDeletePosition, onUpdatePosition }) => {
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)

    const closeModal = () => {
        setOpen(false)
        form.resetFields()
    }

    const openModal = () => setOpen(true)

    async function onFormSubmit() {
        try {
            const values: FormPositionData = await form.validateFields()
            if (values.cost === item.cost && values.name === item.name) return closeModal()

            onUpdatePosition({ _id: item._id, category: item.category, ...values })
            closeModal()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <List.Item className="flex justify-between">
            <PositionModalForm form={form} open={open} onClose={closeModal} item={item} onOk={onFormSubmit}/>

            <Paragraph className="!mb-0">
                {item.name} - {item.cost}
            </Paragraph>

            <Space.Compact>
                <Button onClick={openModal} type="text">Edit</Button>
                <Popconfirm
                    title="Delete the position" okText="Yes" cancelText="No"
                    description="Are you sure to delete this position?"
                    onConfirm={() => onDeletePosition(item._id)}
                >
                    <Button danger type="text">Delete</Button>
                </Popconfirm>
            </Space.Compact>
        </List.Item>
    )
}
