import React, {useEffect, useState} from 'react';
import {useTypedSelector} from "./hooks/useRedux";
import HeaderContainer from "./components/Header/HeaderContainer";
import {ToastContainer} from "react-bootstrap";
import Tooltip from "./components/Tooltip";
import {Route, Routes} from "react-router-dom";
import Overview from "./layouts/dashboard/Overview/Overview";
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
import LoginCheck from "./components/LoginCheck";
import RegisterContainer from "./layouts/login/Register/RegisterContainer";
import LoginContainer from "./layouts/login/Login/LoginContainer";
import {OnlyGuestRoute, PrivateRoute} from "./components/RouteDefenders";
import {useGuestActions} from "./hooks/useGuestActions";

function App() {
    const {toasts} = useTypedSelector(store => store.toastSlice);
    const [loading, setLoading] = useState(true);
    const {check} = useGuestActions();

    useEffect(() => {
        check().finally(() => {
            setLoading(false);
        });
    }, []);

    return <>
        <HeaderContainer />

        {!loading && <Routes>
            <Route path={'guest'} element={<OnlyGuestRoute><GuestLayout /></OnlyGuestRoute>}>
                <Route path={''} element={<NotFound />} />
                <Route path={'register'} element={<RegisterContainer />} />
                <Route path={'login'} element={<LoginContainer />} />
                <Route path={'*'} element={<NotFound />} />
            </Route>

            <Route path={'admin'} element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
                <Route path={''} element={<Overview />} />
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
                <Route path={'*'} element={<NotFound />} />
            </Route>

            <Route path={'/'} element={<LoginCheck />} />
            <Route path={'*'} element={<NotFound />} />
        </Routes>}


        <ToastContainer style={{zIndex: 1100}} className={"m-4 position-fixed"} position={'bottom-end'}>
            {toasts && toasts.map((data, idx) => <Tooltip key={idx} {...data} />)}
        </ToastContainer>
    </>;
}

export default App;
