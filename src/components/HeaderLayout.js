import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
const DASH_REGEX = /^\/dash(\/)*/;
const USER_REGEX = /^\/dash\/users(\/)?$/;
const REQUEST_REGEX = /^\/dash\/requests(\/)?$/;

function HeaderLayout() {
  const { isAdmin, isManager } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const handleLogout = () => {
    sendLogout();
  };

  const dashNavVisibility = !DASH_REGEX.test(pathname)
    ? "dash-header-none"
    : "";

  const userClass = USER_REGEX.test(pathname) ? "active" : "";
  const requestClass = REQUEST_REGEX.test(pathname) ? "active" : "";
  const addUserClass = pathname === "/dash/users/new" ? "active" : "";
  const dashClass = pathname === "/dash" ? "active" : "";
  return (
    <>
      <div className="container-fluid p-2 bg-primary text-white text-center">
        <h2>Neighbors Management App</h2>
      </div>
      <nav
        className={`navbar navbar-expand-sm bg-dark navbar-dark sticky-top ${dashNavVisibility}`}
      >
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${dashClass}`} to="/dash">
                Home
              </Link>
            </li>
            {(isAdmin || isManager) && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${requestClass}`}
                    to="/dash/requests"
                  >
                    Requests
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${userClass}`} to="/dash/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${addUserClass}`}
                    to="/dash/users/new"
                  >
                    Add User
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item"></li>
          </ul>
          <IconButton aria-label="logout" onClick={handleLogout}>
            <LogoutIcon style={{ color: "white", fontSize: "30px" }} />
          </IconButton>
        </div>
      </nav>
    </>
  );
}

export default HeaderLayout;
