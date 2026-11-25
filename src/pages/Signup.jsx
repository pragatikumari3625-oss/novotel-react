
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [captcha, setCaptcha] = useState(() => ({
    first: Math.floor(Math.random() * 9) + 1,
    second: Math.floor(Math.random() * 9) + 1
  }));

  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [message, setMessage] = useState("");

  const refreshCaptcha = () => {
    setCaptcha({
      first: Math.floor(Math.random() * 9) + 1,
      second: Math.floor(Math.random() * 9) + 1
    });
    setCaptchaAnswer("");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setMessage("");

    if (Number(age) < 18 || Number(age) > 100) {
      setMessage("Age must be between 18 and 100.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setMessage("Enter a valid 10-digit phone number.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (Number(captchaAnswer) !== captcha.first + captcha.second) {
      setMessage("Incorrect CAPTCHA answer. Please try again.");
      refreshCaptcha();
      return;
    }

    const result = signup({
      name: name.trim(),
      age: Number(age),
      phone,
      email: email.trim().toLowerCase(),
      password
    });

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    alert("Account created successfully! Please log in.");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSignup}>
        <h2>Create Your NOVOTEL Account</h2>

        <p>Register to discover and book your favourite hotels.</p>

        {message && (
          <p style={{ color: "red" }} role="alert">
            {message}
          </p>
        )}

        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Age</label>
        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          min="18"
          max="100"
          required
        />

        <label>Phone Number</label>
        <input
          type="tel"
          placeholder="Enter 10-digit phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength="10"
          required
        />

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
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="6"
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <div style={{ margin: "15px 0" }}>
          <label>
            CAPTCHA: What is {captcha.first} + {captcha.second}?
          </label>

          <input
            type="number"
            placeholder="Enter CAPTCHA answer"
            value={captchaAnswer}
            onChange={(e) => setCaptchaAnswer(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={refreshCaptcha}
            style={{ marginTop: "8px" }}
          >
            Refresh CAPTCHA
          </button>
        </div>

        <button type="submit">Create Account</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;

