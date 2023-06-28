import React from "react";
import HeaderLayout from "./HeaderLayout";
import { Outlet } from "react-router-dom";
import FooterLayout from "./FooterLayout";

const DashLayout = () => {
  return (
    <div>
      <HeaderLayout />
      <div
        className="container"
        style={{
          marginTop: "60px",
          marginBottom: "120px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Outlet />
      </div>
      <FooterLayout />
    </div>
  );
};

export default DashLayout;
