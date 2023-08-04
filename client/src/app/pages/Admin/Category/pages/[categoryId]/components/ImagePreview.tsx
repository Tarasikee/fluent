import { Image, Skeleton } from 'antd'
import { FC } from 'react'

type Props = {
    isLoading: boolean
    previewImageSrc: string
}

export const ImagePreview: FC<Props> = ({ previewImageSrc, isLoading }) => {
    if (isLoading) {
        return <Skeleton.Image className="w-full"/>
    }

    return (
        <Image className="w-full h-full rounded-lg" src={previewImageSrc}/>
    )
}
