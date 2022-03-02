import React from 'react';
import {useAction, useTypedSelector} from "../../hooks/useRedux";
import {useNavigate} from "react-router-dom";
import Header from "./Header";

const HeaderContainer = () => {
    const navigate = useNavigate();
    const {isAuth} = useTypedSelector(store => store.userSlice);
    const {logout} = useAction();

    const links = [
        {to: '/admin/', name: 'Overview'},
        {to: '/admin/analytics', name: 'Analytics'},
        {to: '/admin/history', name: 'History'},
        {to: '/admin/add-new-order', name: 'Order'},
        {to: '/admin/categories', name: 'Categories'}
    ];

    const loggerOut = () => {
        logout();
        navigate('/guest/login');
    };

    return <Header {...{isAuth, loggerOut, links}} />;
};

export default HeaderContainer;
