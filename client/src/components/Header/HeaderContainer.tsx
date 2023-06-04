import React from 'react';
import {useTypedSelector} from "../../hooks/useRedux";
import {useNavigate} from "react-router-dom";
import Header from "./Header";
import {useGuestActions} from "../../hooks/useGuestActions";

const HeaderContainer = () => {
    const navigate = useNavigate();
    const {isAuth} = useTypedSelector(store => store.userSlice);
    const {logout} = useGuestActions();

    const links = [
        {to: '/admin/', name: 'Overview'},
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
