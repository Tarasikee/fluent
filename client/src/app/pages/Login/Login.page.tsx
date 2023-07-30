import { ApiError, AuthInput } from '~/common/types'
import { App, Button, Card } from 'antd'
import { CenteredLayout } from '~/components'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { LoginForm } from './components/LoginForm'
import storageToken from '~/common/storageToken'
import { useLoginMutation } from '~/store/api/authApi'
import { useCheckQuery } from '~/store/api/userApi'

function useLoginNotifications() {
    const { notification } = App.useApp()

    return {
        success: () => {
            notification.success({
                placement: 'bottomRight',
                message: 'Login success',
                description: 'Welcome, user!',
            })
        },
        failed: (error: ApiError) => {
            notification.error({
                placement: 'bottomRight',
                message: 'Login failed',
                description: error.data?.message || 'Unknown error',
            })
        },
    }
}

const LoginPage = () => {
    const { success, failed } = useLoginNotifications()
    const [login] = useLoginMutation()
    const navigate = useNavigate()

    async function handleLogin(values: AuthInput) {
        const { email, password } = values

        try {
            const { data: { token } } = await login({ email, password }).unwrap()
            storageToken.set(token)
            success()
            navigate('/admin', { replace: true })
        } catch (error) {
            failed(error as ApiError)
        }
    }

    return (
        <CenteredLayout>
            <Card
                title="Login" className="w-96" bordered={false}
                actions={[
                    <Button key="register-link" type="link">
                        <Link to={'/register'}>Register</Link>
                    </Button>,
                    <Button key="forgot-password" type="link">
                        <Link to={'/register'}>Forgot password</Link>
                    </Button>,
                ]}
            >
                <LoginForm onFinish={handleLogin}/>
            </Card>
        </CenteredLayout>
    )
}

export default LoginPage
