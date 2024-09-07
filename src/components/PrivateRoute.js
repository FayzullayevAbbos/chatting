import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Navigate,  useLocation } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user , google} = useContext(AuthContext);
  const location = useLocation();
  
  
  
  return user || google ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
