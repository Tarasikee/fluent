import React, {useEffect} from 'react';
import {useAction, useTypedSelector} from "./hooks/useRedux";
import Header from "./components/Header";
import {ToastContainer} from "react-bootstrap";
import Tooltip from "./components/Tooltip";
import {Route, Routes} from "react-router-dom";
import Overview from "./layouts/dashboard/Overview";
import Analytics from "./layouts/dashboard/Analytics";
import History from "./layouts/dashboard/History";
import AddNewOrder from "./layouts/dashboard/AddNewOrder";
import Categories from "./layouts/dashboard/Categories/Categories";
import Category from "./layouts/dashboard/Categories/Category";
import Add from "./layouts/dashboard/Categories/Add";
import Loader from "./components/Loader";
import AdminLayout from "./layouts/dashboard/AdminLayout";
import NotFound from "./components/NotFound";
import GuestLayout from "./layouts/login/GuestLayout";

function App() {
    const {toasts} = useTypedSelector(store => store.toastSlice);
    const {isLoading} = useTypedSelector(store => store.userSlice);
    const {check} = useAction();

    useEffect(() => {
        check();
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <Header />

            <Routes>
                <Route path={'admin'} element={<AdminLayout />}>
                    <Route path={''} element={<Overview />} />
                    <Route path={'analytics'} element={<Analytics />} />
                    <Route path={'history'} element={<History />} />
                    <Route path={'add-new-order'} element={<AddNewOrder />} />
                    <Route path={'categories'}>
                        <Route path={''} element={<Categories />} />
                        <Route path={":id"} element={<Category />} />
                        <Route path={"add"} element={<Add />} />
                    </Route>
                    <Route path={'*'} element={<NotFound navigate={'admin'} />} />
                </Route>

                <Route path={'guest/*'} element={<GuestLayout />} />
            </Routes>


            <ToastContainer className={"m-4"} position={'bottom-end'}>
                {toasts && toasts.map((data, idx) => <Tooltip key={idx} {...data} />)}
            </ToastContainer>
        </>
    );
}

export default App;
