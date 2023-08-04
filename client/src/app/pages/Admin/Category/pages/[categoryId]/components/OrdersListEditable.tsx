import { Col, List, Row } from 'antd'
import { FC } from 'react'
import { ListItem } from './OrdersListEditableItem'
import { Position } from '~/store/api/mainApi'

export const OrdersListEditable: FC<{
    isLoading: boolean
    positions: Position[]
    onDeletePosition: (id: string) => void
    onUpdatePosition: (newPosition: Position) => void
}> = ({ positions, isLoading, onDeletePosition, onUpdatePosition }) => (
    <Row gutter={[16, 16]}>
        <Col span={24}>
            <List
                className="mt-5 h-96 overflow-auto"
                loading={isLoading} bordered
                dataSource={positions}
                renderItem={(item) => <ListItem
                    item={item} key={item._id}
                    onDeletePosition={onDeletePosition}
                    onUpdatePosition={onUpdatePosition}
                />}
            />
        </Col>
    </Row>
)
