
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{
      textAlign: "center",
      padding: "100px 20px",
      background: "#f7f9fc",
      minHeight: "100vh"
    }}>
      <h1 style={{ fontSize: "80px", color: "#2367e8" }}>
        404
      </h1>

      <h2>Page Not Found!</h2>

      <p>Sorry, the page you are looking for does not exist.</p>

      <Link to="/" style={{
        display: "inline-block",
        marginTop: "20px",
        padding: "12px 25px",
        background: "#2367e8",
        color: "white",
        textDecoration: "none",
        borderRadius: "8px"
      }}>
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;
