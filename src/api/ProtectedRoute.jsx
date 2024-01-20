import React, { useEffect } from "react";
import Spinner from "../components/other_LoadErrBtns/Spinner";
import { useUser } from "./ApiHooks";
import { useNavigate } from "react-router-dom";

//if not logged in user try to access my cards or my account page
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, user } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate]
  );
  if (isLoading) return <Spinner />;

  if (isAuthenticated)
    return React.Children.map(children, (child) =>
      React.cloneElement(child, { user })
    );
}

export default ProtectedRoute;
