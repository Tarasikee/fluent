import { Button, Form, Input } from 'antd'
import { AuthInput } from '~/common/types'
import { FC } from 'react'

type Props = {
    onFinish: (values: AuthInput) => void
}

export const LoginForm: FC<Props> = ({ onFinish }) => (
    <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
    >
        <Form.Item
            label="Email:"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
        >
            <Input/>
        </Form.Item>

        <Form.Item
            label="Password:"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password/>
        </Form.Item>

        <Form.Item className="mt-10">
            <Button htmlType="submit">
                Login
            </Button>
        </Form.Item>
    </Form>
)
