import { Col, Row } from 'antd'
import { FC, PropsWithChildren } from 'react'

export const CenteredLayout: FC<PropsWithChildren> = ({ children }) => (
    <Row className="h-full" align="middle" justify="center">
        <Col>
            {children}
        </Col>
    </Row>
)
