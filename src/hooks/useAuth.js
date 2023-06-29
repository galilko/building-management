import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

import React from "react";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = "Tenant";

  if (token) {
    const decoded = jwtDecode(token);
    const { id, email, roles, name, debt, building } = decoded.UserInfo;

    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return {
      id,
      email,
      name,
      debt,
      building,
      roles,
      status,
      isManager,
      isAdmin,
    };
  }

  return {
    id: "",
    email: "",
    name: "",
    building: 0,
    debt: 0,
    roles: [],
    status,
    isManager,
    isAdmin,
  };
};

export default useAuth;
