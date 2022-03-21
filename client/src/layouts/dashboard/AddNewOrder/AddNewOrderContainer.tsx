import React from 'react';
import {api} from "../../../store/api";
import {Breadcrumb, Button, Card, Col, Row} from "react-bootstrap";
import Loader from "../../../components/Loader";
import {useNavigate} from "react-router-dom";
import {Basket} from "react-bootstrap-icons";
import {useTypedSelector} from "../../../hooks/useRedux";

const AddNewOrderContainer = () => {
    const navigate = useNavigate();
    const {list} = useTypedSelector(store => store.basketSlice);
    const {data: categories, error, isLoading} = api.useFetchAllCategoriesQuery();

    const openModal = () => {
        navigate('?card=true');
    };

    if (error) {
        return <p>Something went wrong!</p>;
    }

    if (isLoading) {
        return <Loader />;
    }

    return (<>
        <Row>
            <Col md={12} className={"d-flex align-items-center justify-content-between"}>
                <Breadcrumb className={"display-6"}>
                    <Breadcrumb.Item active>Orders</Breadcrumb.Item>
                </Breadcrumb>

                <Button
                    onClick={openModal}
                    className={"d-flex align-items-center"}
                    variant={"outline-secondary"}
                >
                    <Basket className={"m-1 me-2 ms-0"} />
                    <p className={"border-start p-1 ps-2 mb-0 pe-0"}>{list.length}</p>
                </Button>
            </Col>
        </Row>

        <Row>
            {categories && categories.map(c => (
                <Col sm={12} md={6} xl={4} key={c._id} className={"mt-sm-4 mt-md-3 mt-xl-2 "}>
                    <Card>
                        <Card.Img style={{maxHeight: '180px', height: '180px'}} variant="top"
                                  src={'http://localhost:3400/' + c?.imageSrc} />
                        <Card.Body>
                            <Card.Title>{c.name}</Card.Title>
                            <Button onClick={() => navigate(c._id)} variant="primary">Open</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    </>);
};

export default AddNewOrderContainer;
