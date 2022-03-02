import React, {useEffect, useState} from 'react';
import {Button, Col, Form, ListGroup, Row} from "react-bootstrap";
import {api} from "../../../store/api";
import {IOrder} from "../../../interfaces/IOrder";
import HistoryItem from "./HistoryItem";
import Loader from "../../../components/Loader";

const HistoryContainer = () => {

    const [order, setOrder] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const {data, isLoading} = api.useFetchOrdersQuery({start, end, order});
    const [orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
        if (data) {
            setOrders([...data]);
        }
    }, [data]);

    const onOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrder(event.target.value);
    };

    const onStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStart(event.target.value);
    };

    const onEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnd(event.target.value);
    };

    const onReset = () => {
        setOrder('');
        setStart('');
        setEnd('');
    };

    return (
        <div>
            <div className={"d-flex justify-content-between align-items-center mb-5"}>
                <span className={"display-6"}>History</span>
            </div>

            <Form className={"mb-4"}>
                <Row className={"mb-3 row-cols-auto"}>
                    <Form.Group as={Col}>
                        <Form.Label>Order ID</Form.Label>
                        <Form.Control value={order} onChange={onOrderChange} type={"text"} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Begin Date</Form.Label>
                        <Form.Control value={start} onChange={onStartChange} type={"date"} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>End Date</Form.Label>
                        <Form.Control value={end} onChange={onEndChange} type={"date"} />
                    </Form.Group>
                </Row>

                <Button onClick={onReset} variant={"warning"}>Reset</Button>
            </Form>

            <div>
                <div className={"mb-3"}>
                    {!isLoading
                        ? <ListGroup>{orders.map(o => <HistoryItem key={o._id} {...o} />)}</ListGroup>
                        : <Loader />}
                </div>
            </div>
        </div>
    );
};

export default HistoryContainer;
