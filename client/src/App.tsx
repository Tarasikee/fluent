import React, {useEffect} from 'react';
import {useAction, useTypedSelector} from "./hooks/useRedux";
import HeaderContainer from "./components/Header/HeaderContainer";
import {ToastContainer} from "react-bootstrap";
import Tooltip from "./components/Tooltip";
import {Route, Routes} from "react-router-dom";
import Overview from "./layouts/dashboard/Overview";
import Analytics from "./layouts/dashboard/Analytics";
import AddNewOrderContainer from "./layouts/dashboard/AddNewOrder/AddNewOrderContainer";
import Categories from "./layouts/dashboard/Categories/Categories";
import AdminLayout from "./layouts/dashboard/AdminLayout";
import NotFound from "./components/NotFound";
import GuestLayout from "./layouts/login/GuestLayout";
import AddCategoryContainer from "./layouts/dashboard/Categories/Add/AddCategoryContainer";
import CategoryContainer from "./layouts/dashboard/Categories/Category/CategoryContainer";
import OptionsContainer from "./layouts/dashboard/AddNewOrder/Options/OptionsContainer";
import AddNewOrderLayout from "./layouts/dashboard/AddNewOrder/AddNewOrderLayout";
import HistoryContainer from "./layouts/dashboard/History/HistoryContainer";
import FirstOpen from "./components/FirstOpen";

function App() {
    const {toasts} = useTypedSelector(store => store.toastSlice);
    const {check} = useAction();


    useEffect(() => {
        check();
    }, []);

    return <>
        <HeaderContainer />

        <Routes>
            <Route path={'admin'} element={<AdminLayout />}>
                <Route path={''} element={<Overview />} />
                <Route path={'analytics'} element={<Analytics />} />
                <Route path={'history'} element={<HistoryContainer />} />
                <Route path={'add-new-order'} element={<AddNewOrderLayout />}>
                    <Route path={''} element={<AddNewOrderContainer />} />
                    <Route path={':id'} element={<OptionsContainer />} />
                </Route>
                <Route path={'categories'}>
                    <Route path={''} element={<Categories />} />
                    <Route path={":id"} element={<CategoryContainer />} />
                    <Route path={"add"} element={<AddCategoryContainer />} />
                </Route>
            </Route>

            <Route path={'guest/*'} element={<GuestLayout />} />
            <Route path={'*'} element={<NotFound />} />
            <Route path={'/'} element={<FirstOpen />} />
        </Routes>


        <ToastContainer style={{zIndex: 1100}} className={"m-4 position-fixed"} position={'bottom-end'}>
            {toasts && toasts.map((data, idx) => <Tooltip key={idx} {...data} />)}
        </ToastContainer>
    </>;
}

export default App;
