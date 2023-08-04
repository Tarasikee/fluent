import { FC, PropsWithChildren } from 'react'
import { Layout, Typography } from 'antd'

const { Content, Header } = Layout
const { Title } = Typography

export const BasicLayout: FC<PropsWithChildren> = ({ children }) => (
    <Layout className="h-screen">
        <Header className="flex items-center">
            <Title className="!text-white !mb-0 !mt-0">Great Thoughts CRM</Title>
        </Header>

        <Content>
            {children}
        </Content>
    </Layout>
)
