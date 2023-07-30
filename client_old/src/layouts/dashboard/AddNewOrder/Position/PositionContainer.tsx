import React from 'react';
import {api} from "../../../../store/api";
import {useParams} from "react-router-dom";
import Loader from "../../../../components/Loader";
import {Table} from "react-bootstrap";
import PositionItem from "./PositionItem";

const PositionContainer = () => {
    const params = useParams();
    const {data: positions, isLoading} = api.useFetchPositionsByCategoryQuery(params.id as string);


    if (isLoading) {
        return <Loader />;
    }

    return (
        <Table hover size="sm">
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th />
            </tr>
            </thead>
            <tbody>
            {positions && positions.map(pos => <PositionItem key={pos._id} {...pos} />)}
            </tbody>
        </Table>
    );
};

export default PositionContainer;
