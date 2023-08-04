import { ChangeEvent, FC, useContext } from 'react'
import { CategoryIdContext } from '../[categoryId].context'
import { FormTop } from '../components/FormTop'
import { useGetSingleCategoryQuery } from '~/store/api/mainApi'
import { useParams } from 'react-router-dom'

export const FormTopConnector: FC = () => {
    const { categoryId } = useParams()
    const { data,  isLoading } = useGetSingleCategoryQuery(String(categoryId))
    const { set, categoryName, nameTouched } = useContext(CategoryIdContext)

    function setName(e: ChangeEvent<HTMLInputElement>) {
        set({ categoryName: e.target.value, nameTouched: true })
    }

    function setImage(file: File) {
        const reader = new FileReader()
        reader.onload = () => {
            set({ previewImage: reader.result as string, imageFile: file, imageTouched: true })
        }
        reader.readAsDataURL(file)
    }

    return <FormTop
        isLoading={isLoading} touched={nameTouched}
        setName={setName} name={categoryName} defaultName={data?.name || ''}
        setImage={setImage}
    />
}
