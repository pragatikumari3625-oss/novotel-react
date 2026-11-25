
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import MyBookings from "./pages/MyBookings";
import Reviews from "./pages/Reviews";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

// Protect the Admin Dashboard
function AdminRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Main application routes
function AppContent() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/reviews" element={<Reviews />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

