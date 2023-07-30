import React from "react";
import {useTypedSelector} from "../hooks/useRedux";
import {Navigate, useLocation} from "react-router-dom";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const {isAuth} = useTypedSelector(store => store.userSlice);
    const location = useLocation();

    return !isAuth
        ? <Navigate to={"/guest/login"} state={{from: location}} />
        : children;
};

export const OnlyGuestRoute = ({ children }: { children: JSX.Element }) => {
    const {isAuth} = useTypedSelector(store => store.userSlice);

    return isAuth
        ? <Navigate to={"/admin"} state={{replace: true}} />
        : children;
};
