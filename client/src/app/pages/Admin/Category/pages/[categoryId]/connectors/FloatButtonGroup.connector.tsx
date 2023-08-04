import { App, FloatButton, Form } from 'antd'
import { FC, useContext, useState } from 'react'
import { FormPositionData, PositionModalForm } from '../components/PositionModalForm'
import { PlusOutlined, SaveOutlined, SyncOutlined } from '@ant-design/icons'
import { useCreatePositionMutation, useUpdateCategoryMutation } from '~/store/api/mainApi'
import { CategoryIdContext } from '../[categoryId].context'
import classNames from 'classnames'
import { useParams } from 'react-router-dom'

export const FloatButtonGroupConnector: FC = () => {
    const { categoryId } = useParams()
    const { message } = App.useApp()
    const [form] = Form.useForm()

    const [open, setOpen] = useState(false)
    const { categoryName, imageFile, resetValues, nameTouched, imageTouched } = useContext(CategoryIdContext)
    const [updateCategory] = useUpdateCategoryMutation()
    const [createPosition] = useCreatePositionMutation()

    const touched = nameTouched || imageTouched

    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    async function resetValuesHandler() {
        resetValues()
        message.success({ content: 'Changes reset' })
    }

    async function saveChanges() {
        try {
            await updateCategory({ id: String(categoryId), name: categoryName, image: imageFile || undefined })
            message.success({ content: 'Changes saved' })
        } catch (error) {
            message.error({ content: 'Something went wrong!' })
        } finally {
            setTimeout(() => resetValues(), 1000)
        }
    }

    async function createNewPosition() {
        try {
            const values: FormPositionData = await form.validateFields()
            createPosition({ category: String(categoryId), ...values })
            closeModal()
            form.resetFields()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <FloatButton.Group type="primary" shape="square">
            <PositionModalForm
                onOk={createNewPosition}
                form={form} onClose={closeModal} open={open}
            />
            <FloatButton
                tooltip="Reset changes"
                onClick={resetValuesHandler} icon={<SyncOutlined/>}
                className={classNames('transition', {
                    'pointer-events-none blur': !touched,
                })}
            />
            <FloatButton
                tooltip="Save changes"
                className={classNames('transition', {
                    'pointer-events-none blur': !touched,
                })}
                onClick={saveChanges} icon={<SaveOutlined/>}
            />
            <FloatButton
                tooltip="New position"
                onClick={openModal} icon={<PlusOutlined/>}
            />
        </FloatButton.Group>
    )
}
