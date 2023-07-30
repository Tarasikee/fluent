import React from 'react';
import {Table} from "react-bootstrap";
import {useAction, useTypedSelector} from "../../../../hooks/useRedux";
import {Trash} from "react-bootstrap-icons";

const CardContainer = () => {
    const {list} = useTypedSelector(store => store.basketSlice);
    const {removeFromBasket} = useAction();
    const totalPrice = list
        .map(({cost, quantity}) => ({cost: +cost, quantity: +quantity}))
        .reduce((acc, {cost, quantity}) => acc + cost * quantity, 0);

    return (<>{list.length > 0
        ? <>
            <div style={{maxHeight: '350px', overflow: 'auto'}}>
                <Table size="sm">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {list.map(l => <tr key={l._id}>
                        <td>{l.name}</td>
                        <td>{l.quantity}</td>
                        <td>{l.cost}$</td>
                        <td><Trash className={"cursor-pointer"} onClick={() => removeFromBasket(l._id)} /></td>
                    </tr>)}
                    </tbody>
                </Table>
            </div>
            <p>Total price: {totalPrice}$</p>
        </>

        : <p>Card is empty^(</p>
    }</>);
};

export default CardContainer;
