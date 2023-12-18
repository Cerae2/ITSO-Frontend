import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    console.log("Entered username:", username);
    console.log("Entered password:", password);

    // Simulate authentication logic
    if (username === "admin" && password === "admin") {
      console.log("Admin login successful");
      setUser({ role: "admin" });
      return { role: "admin" };
    } else if (username === "user" && password === "user") {
      console.log("User login successful");
      setUser({ role: "user" });
      return { role: "user" };
    } else {
      console.log("Invalid credentials");
      setUser(null);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
  };

  // Include setUser in the context
  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
