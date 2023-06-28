import React from "react";
import useAuth from "../hooks/useAuth";
import { Padding } from "@mui/icons-material";

function FooterLayout() {
  const { name, status } = useAuth();
  return (
    <div class="p-2 bg-dark text-white fixed-bottom">
      <p className="container">
        {name ? (
          <>
            <span style={{ marginRight: "50px" }}>Current User: {name}</span>
            <span>Status: {status}</span>
          </>
        ) : null}
      </p>
    </div>
  );
}

export default FooterLayout;
