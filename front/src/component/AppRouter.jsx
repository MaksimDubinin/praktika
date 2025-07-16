import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Navigate, Route, Routes} from "react-router-dom";
import {adminRoutes, authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    const isAuth = user.isAuth;
    const userMass = user.user;
    const isAdmin = userMass?.role === "ADMIN";
    return (
        <Routes>
            {!isAuth && publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} exact/>
            ))}

            {isAuth &&
                authRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} exact/>
                ))}

            {isAdmin &&
                adminRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} exact/>
                ))}

            <Route
                path="*"
                element={
                    <Navigate to={SHOP_ROUTE} />
                }
            />

        </Routes>
    );
});

export default AppRouter;