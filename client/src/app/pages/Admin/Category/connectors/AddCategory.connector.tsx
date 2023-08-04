import { ChangeEvent, FC, useState } from 'react'
import { AddCategory } from '../components/AddCategory'
import { App } from 'antd'
import { useCreateCategoryMutation } from '~/store/api/mainApi'

export const AddCategoryConnector: FC = () => {
    const { message } = App.useApp()
    const [createCategory] = useCreateCategoryMutation()

    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [imagePreview, setImagePreview] = useState('')
    const [imageFile, setImageFile] = useState<File>()

    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    function handleImage(file: File) {
        const reader = new FileReader()
        reader.onload = () => {
            setImagePreview(reader.result as string)
            setImageFile(file)
        }
        reader.readAsDataURL(file)
    }

    function handleName(e: ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)
    }

    async function handleForm() {
        if (!name || !imageFile) {
            return message.error('Please fill all fields!')
        }

        try {
            await createCategory({ name, image: imageFile })
            closeModal()
        } catch (e) {
            console.error(e)
            message.error('Something went wrong! Please try again later.')
        }
    }

    return <AddCategory
        name={name} handleName={handleName} handleForm={handleForm}
        handleImage={handleImage} imagePreview={imagePreview}
        open={open} closeModal={closeModal} openModal={openModal}
    />
}
