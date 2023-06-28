import React from "react";
import useAuth from "../hooks/useAuth";

function Welcome() {
  const { name, debt } = useAuth();
  return (
    <div>
      <h2>Welcome, {name}!</h2>
      {debt > 0 ? (
        <h4 className="text-danger">
          You have a debt of {debt} NIS. Please pay it as soon as possible.
        </h4>
      ) : null}
      <p>Thank you for being a tenant. We hope you enjoy your stay.</p>
    </div>
  );
}

export default Welcome;
