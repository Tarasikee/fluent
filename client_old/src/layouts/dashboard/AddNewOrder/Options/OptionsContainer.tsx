import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../../../store/api";
import {Breadcrumb, Button, Col, Row} from "react-bootstrap";
import Loader from "../../../../components/Loader";
import PositionContainer from "../Position/PositionContainer";
import {Basket} from "react-bootstrap-icons";
import {useTypedSelector} from "../../../../hooks/useRedux";

const OptionsContainer = () => {
    const navigate = useNavigate();
    const params = useParams();
    const {list} = useTypedSelector(store => store.basketSlice);
    const {data: category, isLoading} = api.useFetchSingleCategoryQuery(params.id as string);

    const openModal = () => {
        navigate('?card=true');
    }

    const back = () => {
        navigate('/admin/add-new-order');
    };

    if (isLoading) {
        return <Loader />;
    }

    return (<>
        <Row>
            <Col md={12} className={"d-flex align-items-center justify-content-between"}>
                <Breadcrumb className={"display-6"}>
                    <Breadcrumb.Item onClick={back}>Orders</Breadcrumb.Item>
                    {category && <Breadcrumb.Item active>{category.name}</Breadcrumb.Item>}
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
        {category ? <PositionContainer /> : <p>There is no such category</p>}
    </>);
};

export default OptionsContainer;
