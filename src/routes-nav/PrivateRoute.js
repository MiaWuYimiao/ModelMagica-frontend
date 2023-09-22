import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ exact, path, children }) {
    const { currentUser } = useContext(UserContext);
    if(!currentUser) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default PrivateRoute;
