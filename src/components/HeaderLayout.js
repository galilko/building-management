import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { PulseLoader } from "react-spinners";

const DASH_REGEX = /^\/dash(\/)*/;
const USER_REGEX = /^\/dash\/users(\/)*$/;
const REPORT_REGEX = /^\/dash\/reports(\/)?$/;
const ADD_USER_REGEX = /^\/dash\/users\/new(\/)?$/;
const ADD_REPORT_REGEX = /^\/dash\/reports\/new(\/)?$/;

function HeaderLayout() {
  const { isAdmin, isManager, status } = useAuth();
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

  const handleReport = () => {
    navigate("/dash/reports/new");
  };

  if (isLoading) return <PulseLoader color="#36d7b7" />;

  const dashNavVisibility = !DASH_REGEX.test(pathname)
    ? "dash-header-none"
    : "";

  const userClass = USER_REGEX.test(pathname) ? "active" : "";
  const reportClass = REPORT_REGEX.test(pathname) ? "active" : "";
  const addUserClass = ADD_USER_REGEX.test(pathname) ? "active" : "";
  const addReportClass = ADD_REPORT_REGEX.test(pathname) ? "active" : "";

  const dashClass = pathname === "/dash" ? "active" : "";

  const managerAndAdminContent = (
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Users
        </a>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li>
            <Link
              className={`dropdown-item nav-link ${userClass}`}
              to="/dash/users"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              className={`dropdown-item nav-link ${addUserClass}`}
              to="/dash/users/new"
            >
              Add User
            </Link>
          </li>
        </ul>
      </li>

      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Reports
        </a>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li>
            <Link
              className={`dropdown-item nav-link ${reportClass}`}
              to="/dash/reports"
            >
              Reports
            </Link>
          </li>
          <li>
            <Link
              className={`dropdown-item nav-link ${addReportClass}`}
              to="/dash/reports/new"
            >
              Add Report
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );

  const tenantContent = (
    <ul class="navbar-nav">
      <li class="nav-item">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={handleReport}
        >
          Report An Issue
        </button>
      </li>
    </ul>
  );

  return (
    <>
      <div className="container-fluid p-4 bg-primary text-white text-center">
        <h2>Neighbors Management App</h2>
      </div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div class="container-fluid">
          <Link className={`navbar-brand ${dashClass}`} to="/dash">
            Home
          </Link>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDarkDropdown"
            aria-controls="navbarNavDarkDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
            {isAdmin || isManager
              ? managerAndAdminContent
              : status === "Tenant"
              ? tenantContent
              : ""}
            {status !== "" && (
              <div className="d-flex ms-auto">
                {isLoading ? (
                  <PulseLoader
                    color="var(--bs-primary)"
                    loading
                    margin={10}
                    size={40}
                    speedMultiplier={0.7}
                  />
                ) : (
                  <IconButton aria-label="logout" onClick={handleLogout}>
                    <LogoutIcon style={{ color: "white", fontSize: "30px" }} />
                  </IconButton>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
/*
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

            <li class="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${userClass}`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Users
              </a>
              <ul class="dropdown-menu dropdown-menu-dark">
                <li className="dropdown-item">
                  <Link className={`nav-link ${userClass}`} to="/dash/users">
                    Users
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link
                    className={`nav-link ${addUserClass}`}
                    to="/dash/users/new"
                  >
                    Add User
                  </Link>
                </li>
              </ul>
            </li>

            <li class="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${reportClass}`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Reports
              </a>
              <ul class="dropdown-menu dropdown-menu-dark">
                <li className="dropdown-item">
                  <Link
                    className={`nav-link ${reportClass}`}
                    to="/dash/reports"
                  >
                    Reports
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link
                    className={`nav-link ${addReportClass}`}
                    to="/dash/reports/new"
                  >
                    Add Report
                  </Link>
                </li>
              </ul>
            </li>

            {(isAdmin || isManager) && (
              <>
                <li className="nav-item"></li>
              </>
            )}
          </ul>
          {isLoading ? (
            <PulseLoader
              color="#87aebb"
              cssOverride={{}}
              loading
              margin={10}
              size={40}
              speedMultiplier={0.7}
            />
          ) : (
            <IconButton aria-label="logout" onClick={handleLogout}>
              <LogoutIcon style={{ color: "white", fontSize: "30px" }} />
            </IconButton>
          )}
        </div>
      </nav>
    </>
  );
}
*/
export default HeaderLayout;
