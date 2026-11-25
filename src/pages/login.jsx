
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");

    const result = login(email, password);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    alert(result.message);

    // Redirect based on account type
    if (email.trim().toLowerCase() === "admin@staynest.com") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>NOVOTEL Login</h2>

        <p>Welcome back! Sign in to your account.</p>

        {message && (
          <p style={{ color: "red" }} role="alert">
            {message}
          </p>
        )}

        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>

        <hr />

        <p style={{ fontSize: "13px" }}>
          Admin demo login:
          <br />
          Email: admin@staynest.com
          <br />
          Password: admin123
        </p>
      </form>
    </div>
  );
}

export default Login;
