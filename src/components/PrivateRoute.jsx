import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function PrivateRoute({ children }) {
  const { token } = useAuth();
  console.log("[token]", token);

  if (token === null) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Redirect to="/login" />;
  }

  return children;
}
