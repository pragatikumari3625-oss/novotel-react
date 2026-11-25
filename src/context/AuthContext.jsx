
import { createContext, useContext, useState } from "react";
import {
  STORAGE_KEYS,
  getSession,
  findUser,
  registerUser,
  saveSession,
  logoutUser
} from "../services/storage";

const AuthContext = createContext(null);

// Demo admin credentials
const ADMIN_EMAIL = "admin@staynest.com";
const ADMIN_PASSWORD = "admin123";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => getSession());

  // Register a new user
  const signup = (userDetails) => {
    const newUser = {
      id: Date.now(),
      ...userDetails,
      role: "user"
    };

    const result = registerUser(newUser);

    return result;
  };

  // Login for user or admin
  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    // Admin login
    if (
      cleanEmail === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      const admin = {
        id: "admin",
        name: "Administrator",
        email: ADMIN_EMAIL,
        role: "admin"
      };

      saveSession(admin);
      setCurrentUser(admin);

      return {
        success: true,
        message: "Admin login successful!"
      };
    }

    // Normal user login
    const user = findUser(cleanEmail);

    if (!user || user.password !== password) {
      return {
        success: false,
        message: "Invalid email or password."
      };
    }

    const loggedInUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: "user"
    };

    saveSession(loggedInUser);
    setCurrentUser(loggedInUser);

    return {
      success: true,
      message: "Login successful!"
    };
  };

  // Logout
  const logout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isLoggedIn: Boolean(currentUser),
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Access authentication from any component
export function useAuth() {
  return useContext(AuthContext);
}
