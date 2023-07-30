import { CenteredLayout } from '../CenteredLayout/CenteredLayout'
import { FC } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

export const FullScreenLoader: FC = () => (
    <CenteredLayout>
        <Spin size="large" indicator={antIcon}/>
    </CenteredLayout>
)
