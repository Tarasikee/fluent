import React, {useEffect} from 'react';
import {useAction, useTypedSelector} from "./hooks/useRedux";
import Header from "./components/Header";
import LoginIndex from "./layouts/login";
import {ToastContainer} from "react-bootstrap";
import Tooltip from "./components/Tooltip";
import AdminIndex from "./layouts/dashboard";

function App() {
    const {toasts} = useTypedSelector(store => store.toastSlice);
    const {isAuth, isLoading} = useTypedSelector(store => store.userSlice);
    const {check} = useAction();

    useEffect(() => {
        check();
    }, []);

    return (
        <>
            <Header />
            {isLoading || isAuth ? <AdminIndex /> : <LoginIndex />}
            <ToastContainer className={"m-4"} position={'bottom-end'}>
                {toasts && toasts.map((data, idx) => <Tooltip key={idx} {...data} />)}
            </ToastContainer>
        </>
    );
}

export default App;
