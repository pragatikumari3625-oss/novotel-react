
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser, isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-mark">N</span>
        <span>NOVOTEL</span>
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/hotels">Hotels</Link>
        <Link to="/reviews">Reviews</Link>

        {currentUser?.role !== "admin" && (
          <Link to="/my-bookings">My Bookings</Link>
        )}

        {currentUser?.role === "admin" && (
          <Link to="/admin">Admin Dashboard</Link>
        )}
      </nav>

      <div className="nav-actions">
        {isLoggedIn ? (
          <>
            <span className="welcome">
              Hi, {currentUser.name}
            </span>

            <button
              className="btn btn-outline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-outline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
