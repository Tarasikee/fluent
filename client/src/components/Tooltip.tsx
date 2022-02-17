import React, {FC, useState} from 'react';
import {Toast} from "react-bootstrap";
import {IToast} from "../interfaces/IToast";

const Tooltip: FC<IToast> = ({bg, title, message}) => {
    const [show, setShow] = useState(true);
    const whited = ['Primary', 'Secondary', 'Success', 'Danger', 'Dark'];

    return (
        <Toast bg={bg.toLowerCase()} onClose={() => setShow(false)} show={show} delay={5000} autohide>
            <Toast.Header>
                <strong className="me-auto">{title}</strong>
                <small>Just now</small>
            </Toast.Header>
            <Toast.Body className={whited.includes(bg) ? 'text-white' : ''}>
                {message}
            </Toast.Body>
        </Toast>
    );
};

export default Tooltip;
