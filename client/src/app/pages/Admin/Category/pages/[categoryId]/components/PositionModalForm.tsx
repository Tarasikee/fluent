import { Form, Input, InputNumber, Modal } from 'antd'
import { FC } from 'react'
import { FormInstance } from 'antd/es/form/hooks/useForm'
import { Position } from '~/store/api/mainApi'

export type FormPositionData = Omit<Position, '_id' | 'category'>

type Props = {
    open: boolean
    onClose: () => void
    form: FormInstance<FormPositionData>
    onOk: () => void
    item?: FormPositionData
}

export const PositionModalForm: FC<Props> = ({ form, onOk, onClose, item, open }) => (
    <Modal onOk={onOk} title="Edit position" open={open} onCancel={onClose}>
        <Form form={form} layout="vertical" initialValues={item}>
            <Form.Item
                label="Name" name="name"
                rules={[{ required: true, message: 'Please input the name of position!' }]}
            >
                <Input className="w-full border rounded"/>
            </Form.Item>
            <Form.Item
                label="Cost" name="cost"
                rules={[{ required: true, type: 'number', min: 1, max: 1000000 }]}
            >
                <InputNumber className="w-full border rounded"/>
            </Form.Item>
        </Form>
    </Modal>
)
