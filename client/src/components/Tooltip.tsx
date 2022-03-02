import React, {FC, useEffect, useState} from 'react';
import {Toast} from "react-bootstrap";
import {IToast} from "../interfaces/IToast";

const Tooltip: FC<IToast> = ({bg, title, message}) => {
    const [show, setShow] = useState(true);
    const [time, setTime] = useState(1);
    const whited = ['primary', 'secondary', 'success', 'danger', 'dark'];

    useEffect(() => {
        setInterval(() => setTime(prev => prev + 1), 1000);
    }, []);

    return (
        <Toast bg={bg.toLowerCase()} onClose={() => setShow(false)} show={show} delay={5000} autohide>
            <Toast.Header>
                <strong className="me-auto">{title}</strong>
                <small>{time} second{time > 1 && 's'} ago</small>
            </Toast.Header>
            <Toast.Body className={whited.includes(bg) ? 'text-white' : ''}>
                {message}
            </Toast.Body>
        </Toast>
    );
};

export default Tooltip;
