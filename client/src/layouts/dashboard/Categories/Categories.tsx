import React, {useEffect} from 'react';
import {categoriesAPI} from "../../../store/query/categoriesAPI";
import {useAction} from "../../../hooks/useRedux";
import Loader from "../../../components/Loader";
import {Button, ListGroup} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

const Categories = () => {

    const navigate = useNavigate();
    const {createToast, logout} = useAction();
    let {data, error, isLoading} = categoriesAPI.useFetchAllCategoriesQuery();

    // useEffect(() => {
    //     if (!error) return;
    //     createToast({bg: 'Warning', title: 'Great thoughts', message: 'Sorry, your authorization has expired!'});
    //     logout();
    //
    //     return () => {
    //         error = {};
    //     };
    // }, [error]);

    return (
        <div>
            <div className={"d-flex justify-content-between align-items-center mb-5"}>
                <span className={"display-5"}>Categories</span>
                <Button onClick={() => navigate('add')}>Create</Button>
            </div>

            {isLoading
                ? <Loader />
                : <ListGroup>
                    {data && data.map(({_id, name}) => (
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
