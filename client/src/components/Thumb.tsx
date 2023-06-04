import { FC } from 'react'

type Props = {
    thumb: string | ArrayBuffer | null;
}

const Thumb: FC<Props> = ({thumb}) => {
    if (!thumb) {
        return null
    }

    const imgUrl = URL.createObjectURL(thumb as unknown as Blob)

    return (
        <div>
            <img
                className="img-thumbnail"
                alt="thumb"
                src={imgUrl}
            />
        </div>
    )
}

export default Thumb
