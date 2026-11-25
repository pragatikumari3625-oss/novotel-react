
// =====================================
// NOVOTEL - LOCAL STORAGE MANAGEMENT
// =====================================

export const STORAGE_KEYS = {
  USERS: "novotel_users",
  SESSION: "novotel_session",
  HOTELS: "novotel_hotels",
  BOOKINGS: "novotel_bookings",
  REVIEWS: "novotel_reviews"
};

// Get data from Local Storage
export const getData = (key, fallback = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (error) {
    console.error("Storage read error:", error);
    return fallback;
  }
};

// Save data to Local Storage
export const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Remove data from Local Storage
export const removeData = (key) => {
  localStorage.removeItem(key);
};

// Register a new user
export const registerUser = (user) => {
  const users = getData(STORAGE_KEYS.USERS, []);

  const emailExists = users.some(
    (item) => item.email.toLowerCase() === user.email.toLowerCase()
  );

  if (emailExists) {
    return {
      success: false,
      message: "Email is already registered."
    };
  }

  saveData(STORAGE_KEYS.USERS, [...users, user]);

  return {
    success: true,
    message: "Account created successfully!"
  };
};

// Find registered user
export const findUser = (email) => {
  const users = getData(STORAGE_KEYS.USERS, []);

  return users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
};

// Save login session
export const saveSession = (user) => {
  const session = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || "user"
  };

  saveData(STORAGE_KEYS.SESSION, session);
};

// Get current session
export const getSession = () => {
  return getData(STORAGE_KEYS.SESSION, null);
};

// Logout
export const logoutUser = () => {
  removeData(STORAGE_KEYS.SESSION);
};
