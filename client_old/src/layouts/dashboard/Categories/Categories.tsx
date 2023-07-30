import React from 'react';
import {api} from "../../../store/api";
import Loader from "../../../components/Loader";
import {Button, ListGroup} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

const Categories = () => {

    const navigate = useNavigate();
    const {data, error, isLoading} = api.useFetchAllCategoriesQuery();

    if (error) {
        return <p>Something went wrong!</p>;
    }

    return (
        <div>
            <div className={"d-flex justify-content-between align-items-center mb-5"}>
                <span className={"display-6"}>Categories</span>
                <Button onClick={() => navigate('add')}>Create</Button>
            </div>

            {isLoading
                ? <Loader />
                : <ListGroup>
                    {data && data.slice(0).reverse().map(({_id, name}) => (
                        <ListGroup.Item action key={_id} onClick={() => navigate(_id)}>
                            {name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            }
        </div>
    );
};

export default Categories;
