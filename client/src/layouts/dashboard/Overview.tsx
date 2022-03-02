import React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {ArrowDown, ArrowUp} from "react-bootstrap-icons";
import {api} from "../../store/api";
import Loader from "../../components/Loader";

const Overview = () => {

    const date = new Date();
    const yesterday = new Date(date.setDate(date.getDate() - 1)).toISOString().slice(0, 10);
    const {data, isLoading} = api.useFetchOverviewQuery();

    if (isLoading || !data) {
        return <Loader />;
    }

    return (
        <div>
            <div className={"d-flex justify-content-between align-items-center mb-5"}>
                <span className={"display-6"}>Yesterday review ({yesterday})</span>
            </div>

            <Container>
                <Row>
                    <Col md={6}>
                        <Card bg={"info"} text={"white"} className="mb-2">
                            <Card.Body>
                                <Card.Title className={"fw-light"}>Gain:</Card.Title>
                                <Card.Title className={"mb-0"}>
                                    <span className={"fw-normal fs-1 ps-2"}>{data.gain.yesterday} usd.</span>
                                </Card.Title>
                                <Card.Title
                                    className={`fw-normal fs-1 ${data.gain.isHigher ? "text-success" : "text-danger"}`}>
                                    <span>
                                        {data.gain.isHigher ? <ArrowUp /> : <ArrowDown />} {data.gain.percent || 0}%
                                    </span>
                                </Card.Title>
                                <Card.Text>
                                    Gain of your business yesterday is on {data.gain.percent || 0}%
                                    {data.gain.isHigher ? " more" : " less"} than average: <br />
                                    Difference between yesterday and average: {data.gain.compare || 0}$
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card bg={"warning"} text={"white"} className="mb-2">
                            <Card.Body>
                                <Card.Title className={"fw-light"}>Orders:</Card.Title>
                                <Card.Title className={"mb-0"}>
                                    <span className={"fw-normal fs-1 ps-2"}>{data.orders.yesterday || 0} ords.</span>
                                </Card.Title>
                                <Card.Title
                                    className={`fw-normal fs-1 ${data.orders.isHigher ? "text-success" : "text-danger"}`}>
                                    <span>
                                        {data.orders.isHigher ? <ArrowUp /> : <ArrowDown />} {data.orders.percent || 0}%
                                    </span>
                                </Card.Title>
                                <Card.Text>
                                    Quantity of orders yesterday is on {data.orders.percent || 0}%
                                    {data.orders.isHigher ? " more" : " less"} than average: <br />
                                    Difference between yesterday and average:  {data.orders.compare || 0} ords.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Overview;
