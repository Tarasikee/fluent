import React from 'react';
import {Navigate} from 'react-router-dom';
import {useTypedSelector} from "../hooks/useRedux";

const FirstOpen = () => {
    const {isAuth} = useTypedSelector(store => store.userSlice);

    if (isAuth) {
        return <Navigate to={'admin'} />;
    } else {
        return <Navigate to={'guest/login'} />;
    }
};

export default FirstOpen;
