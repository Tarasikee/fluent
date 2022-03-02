import React, {FC, useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useAction} from "../../../../hooks/useRedux";
import {IPosition} from "../../../../interfaces/IPosition";
import {createSuccess} from "../../../../store/actions/toastActions";

const PositionItem: FC<IPosition> = ({_id, name, cost}) => {
    const {createSuccess, addToBasket} = useAction();

    const [value, setValue] = useState(1);
    const [disabled, setDisabled] = useState(false);

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(+event.target.value);
    };

    const onClick = () => {
        addToBasket({_id, name, cost, quantity: value});
        setValue(1);
        createSuccess(`${name} was added to card x${value}`);
    };

    useEffect(() => {
        setDisabled(value < 1);
    }, [value]);

    return (
        <tr>
            <td>{name}</td>
            <td>{cost}$</td>
            <td><Form.Control type="number" min={1} {...{value, onChange}} /></td>
            <td className={"d-flex justify-content-end"}><Button {...{disabled, onClick}}>Add</Button></td>
        </tr>
    );
};

export default PositionItem;
