import { Button, Input, Skeleton, Upload } from 'antd'
import { ChangeEvent, FC } from 'react'
import { Show } from '~/components'
import { UploadOutlined } from '@ant-design/icons'

type Props = {
    isLoading: boolean
    touched: boolean

    defaultName: string
    name: string
    setName: (e: ChangeEvent<HTMLInputElement>) => void
    setImage: (image: File) => void
}

const FormTopLoading: FC = () => (
    <div className="flex gap-x-6">
        <Skeleton.Input className="w-full" active/>
        <Skeleton.Button active/>
    </div>
)

export const FormTop: FC<Props> = ({ isLoading, setImage, defaultName, setName, name, touched }) => {
    return (
        <Show condition={!isLoading} fallback={<FormTopLoading/>}>
            <div className="flex space-x-9">
                <Input
                    placeholder="Category name"
                    value={touched ? name : defaultName}
                    onChange={setName}
                />

                <Upload showUploadList={false} fileList={[]}
                    customRequest={({ onSuccess, file }) => {
                        setImage(file as File)
                        onSuccess?.('ok')
                    }}
                >
                    <Button type="default" icon={<UploadOutlined/>}>Click to Upload</Button>
                </Upload>
            </div>
        </Show>
    )
}
