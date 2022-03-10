import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {useTypedSelector} from "../hooks/useRedux";
import {useGuestActions} from "../hooks/useGuestActions";

const LoginCheck = () => {
    const {check} = useGuestActions();
    const {isAuth} = useTypedSelector(store => store.userSlice);

    useEffect(() => {
        check();
    }, []);

    if (isAuth) {
        return <Navigate to={'/admin'} />;
    } else {
        return <Navigate to={'/guest/login'} />;
    }
};

export default LoginCheck;
