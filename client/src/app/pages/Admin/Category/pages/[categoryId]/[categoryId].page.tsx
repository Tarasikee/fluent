import { Button, Col, Row } from 'antd'
import { FloatButtonGroupConnector, FormTopConnector, ImagePreviewConnector, OrdersListEditableConnector } from './connectors'
import { CategoryIdProvider } from './[categoryId].context'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const CategoryIdPage: FC = () => {
    const navigate = useNavigate()

    return (
        <CategoryIdProvider>
            <Button onClick={() => navigate('/admin/category')}>Back</Button>

            <Row gutter={[16, 16]} className="mt-5 mx-10">
                <Col span={12} className="h-full">
                    <FormTopConnector/>
                    <OrdersListEditableConnector/>
                </Col>

                <Col span={12}>
                    <ImagePreviewConnector/>
                </Col>
            </Row>

            <FloatButtonGroupConnector/>
        </CategoryIdProvider>
    )
}

export default CategoryIdPage
