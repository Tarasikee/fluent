import React, {useEffect} from 'react';
import {useAction} from "../hooks/useRedux";
import {Navigate} from "react-router-dom";

const NotFound = ({navigate}: { navigate: string }) => {
    const {createToast} = useAction();

    useEffect(() => {
        createToast({bg: 'warning', title: 'Great Thoughts Warning', message: 'Can\'t find route'});
    }, []);

    return <Navigate to={navigate} />;
};

export default NotFound;
