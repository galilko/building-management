import React from "react";
import useAuth from "../hooks/useAuth";
import { Padding } from "@mui/icons-material";

function FooterLayout() {
  const { name, status } = useAuth();
  return (
    <div class="p-3 bg-dark text-white text-center fixed-bottom">
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
