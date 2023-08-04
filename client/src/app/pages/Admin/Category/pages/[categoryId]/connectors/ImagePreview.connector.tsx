import { FC, useContext } from 'react'
import { CategoryIdContext } from '../[categoryId].context'
import { ImagePreview } from '../components/ImagePreview'
import { useGetSingleCategoryQuery } from '~/store/api/mainApi'
import { useParams } from 'react-router-dom'

export const ImagePreviewConnector: FC = () => {
    const { categoryId } = useParams()
    const { data, isLoading } = useGetSingleCategoryQuery(String(categoryId))

    const { previewImage } = useContext(CategoryIdContext)

    return <ImagePreview
        isLoading={isLoading}
        previewImageSrc={previewImage || 'http://localhost:3400/' + data?.imageSrc || ''}
    />
}
