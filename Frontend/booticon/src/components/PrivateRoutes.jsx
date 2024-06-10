import { useEffect } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";


const PrivateRoutes = ({ element, ...rest }) => {

    const isLoggedIn = sessionStorage.getItem('jwtToken');


    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;