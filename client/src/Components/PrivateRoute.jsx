import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const Spinner = () => {
  return (
    <>
      <h1>Loading...</h1>
    </>
  );
};
const PrivateRoute = ({ component: Component }) => {
  const user = useSelector((state) => state.user);
  if (user.loading) {
    return <Spinner />;
  }
  if (user.isAuthenticated) {
    return <Component />;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
