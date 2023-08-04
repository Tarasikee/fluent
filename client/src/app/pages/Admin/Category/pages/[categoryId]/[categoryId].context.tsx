import { FC, PropsWithChildren, createContext, useState } from 'react'

type SetFunction<T> = (values: Partial<Omit<T, 'set' | 'resetValues'>>) => void

type Context = {
    previewImage: string | null
    imageFile: File | null
    categoryName: string
    nameTouched: boolean
    imageTouched: boolean

    set: SetFunction<Context>
    resetValues: () => void
}

export const CategoryIdContext = createContext<Context>({
    previewImage: null,
    imageFile: null,
    categoryName: '',
    nameTouched: false,
    imageTouched: false,

    set: () => {},
    resetValues: () => {},
})

export const CategoryIdProvider: FC<PropsWithChildren> = ({ children }) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [categoryName, setCategoryName] = useState('')
    const [nameTouched, setNameTouched] = useState(false)
    const [imageTouched, setImageTouched] = useState(false)

    function set(values: Partial<Omit<Context, 'set' | 'resetValues'>>) {
        if (values.previewImage) setPreviewImage(values.previewImage)
        if (values.imageFile) setImageFile(values.imageFile)
        if (values.categoryName) setCategoryName(values.categoryName)
        if (values.nameTouched) setNameTouched(values.nameTouched)
        if (values.imageTouched) setImageTouched(values.imageTouched)
    }

    function resetValues() {
        setPreviewImage(null)
        setImageFile(null)
        setCategoryName('')
        setNameTouched(false)
        setImageTouched(false)
    }

    return (
        <CategoryIdContext.Provider value={{
            previewImage, imageFile, categoryName, imageTouched, nameTouched,
            set, resetValues,
        }}>
            {children}
        </CategoryIdContext.Provider>
    )
}
