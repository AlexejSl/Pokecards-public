import React from "react";
import { useUser } from "./ApiHooks";

function ProvideUserInfo({ children }) {
  const { user, isLoading, isAuthenticated } = useUser();

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { user, isAuthenticated })
  );
}

export default ProvideUserInfo;
