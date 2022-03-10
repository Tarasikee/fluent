import React from 'react';
import {api} from "../../store/api";
import Loader from "../../components/Loader";
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from 'recharts';
import {Container, Row} from "react-bootstrap";

const Analytics = () => {
    const {data, isLoading} = api.useFetchAnalyticsQuery();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <div className={"d-flex justify-content-between align-items-center mb-3"}>
                <span className={"display-6"}>Analytics</span>
            </div>

            {!data
                ? <p>There is on data to analyze, then it`s time to start a business:)</p>
                : <div>
                    <p className={"fs-4"}>Average bill: {data.averageBill || 0}$</p>

                    <Container fluid className={"mb-5 pb-5"}>
                        <Row className={"overflow-auto mt-5"}>
                            <p className="display-6">
                                Gain data of all time:
                            </p>
                            <AreaChart
                                width={1200}
                                height={400}
                                data={data.chart}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="label" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="gain" stroke="#82ca9d" />
                            </AreaChart>
                        </Row>


                        <Row className={"overflow-auto mt-5"}>
                            <p className="display-6">
                                Orders data of all time:
                            </p>
                            <AreaChart
                                width={1200}
                                height={400}
                                data={data.chart}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="label" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" name={"orders"} dataKey="order" stroke="#543fdf" fill="#543fdf" />
                            </AreaChart>
                        </Row>
                    </Container>
                </div>}
        </div>
    );
};

export default Analytics;
