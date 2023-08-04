import { Button, FloatButton, Form, Image, Input, Modal, Skeleton, Upload } from 'antd'
import { ChangeEvent, FC } from 'react'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Show } from '~/components'

type Props = {
    open: boolean
    closeModal: () => void
    openModal: () => void
    handleForm: () => void

    name: string
    handleName: (e: ChangeEvent<HTMLInputElement>) => void

    imagePreview: string
    handleImage: (file: File) => void
}

export const AddCategory: FC<Props> = ({
    open, closeModal, handleForm, handleName,
    name, handleImage, imagePreview, openModal,
}) => (
    <>
        <Modal onOk={handleForm} title="Add category" open={open} onCancel={closeModal}>
            <Form layout="vertical">
                <Form.Item name="name" label="Name" required>
                    <Input value={name} onChange={handleName}/>
                </Form.Item>

                <Form.Item name="image" label="Image" required>
                    <Upload showUploadList={false} fileList={[]}
                        customRequest={({ onSuccess, file }) => {
                            onSuccess?.('ok')
                            handleImage(file as File)
                        }}
                    >
                        <Button type="default" icon={<UploadOutlined/>}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
            </Form>

            <Show condition={!!imagePreview} fallback={<Skeleton.Image/>}>
                <Image src={imagePreview} height={96}/>
            </Show>
        </Modal>

        <FloatButton
            tooltip="Add category" rootClassName="flex"
            icon={<PlusOutlined className="flex"/>}
            onClick={openModal}
        />
    </>
)
