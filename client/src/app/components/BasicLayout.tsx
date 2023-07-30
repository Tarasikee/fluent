import { FC, PropsWithChildren } from 'react'
import { Layout, Typography } from 'antd'

const { Content, Header, Footer } = Layout
const { Title } = Typography

export const BasicLayout: FC<PropsWithChildren> = ({ children }) => (
    <Layout className="h-screen">
        <Header className="flex items-center content-start">
            <Title className="!text-white !mb-0 !mt-0">Great Thoughts CRM</Title>
        </Header>

        <Content>
            {children}
        </Content>

        <Footer className="bg-gray-200/20">
            All rights reserved &copy; {new Date().getFullYear()}
        </Footer>
    </Layout>
)
