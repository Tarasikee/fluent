import React from 'react';
import {Breadcrumb} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useAction} from "../../../hooks/useRedux";

const Add = () => {

    const navigate = useNavigate();
    const {createToast} = useAction();

    return (
        <div className={"d-flex justify-content-between align-items-center mb-5"}>
            <Breadcrumb  className={"display-5"}>
                <Breadcrumb.Item onClick={() => navigate('/categories')}>Categories</Breadcrumb.Item>
                <Breadcrumb.Item active>Add</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
};

export default Add;
