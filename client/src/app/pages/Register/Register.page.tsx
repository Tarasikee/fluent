import { ApiError, AuthInput } from '~/common/types'
import { App, Button, Card } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { CenteredLayout } from '~/components'
import { FC } from 'react'
import { RegisterForm } from './components/RegisterForm'
import { useRegisterMutation } from '~/store/api/authApi'

function useRegisterNotifications() {
    const { notification } = App.useApp()

    return {
        success: () => {
            notification.success({
                placement: 'bottomRight',
                message: 'Register success',
                description: 'Thanks for registration!',
            })
        },
        failed: (error: ApiError) => {
            notification.error({
                placement: 'bottomRight',
                message: 'Register failed',
                description: error.data?.message || 'Unknown error',
            })
        },
    }
}

const RegisterPage: FC = () => {
    const { success, failed } = useRegisterNotifications()
    const [register] = useRegisterMutation()
    const navigate = useNavigate()

    async function handleRegister(values: AuthInput) {
        const { password, email } = values

        try {
            await register({ email, password }).unwrap()
            success()
            navigate('/login', { replace: true })
        } catch (error) {
            failed(error as ApiError)
        }
    }

    return (
        <CenteredLayout>
            <Card
                title="Register" className="w-96" bordered={false}
                actions={[
                    <Button key="login-link" type="link">
                        <Link to={'/login'}>Login</Link>
                    </Button>,
                    <Button key="forgot-password" type="link">
                        <Link to={'/register'}>Forgot password</Link>
                    </Button>,
                ]}
            >
                <RegisterForm onFinish={handleRegister}/>
            </Card>
        </CenteredLayout>
    )
}

export default RegisterPage
