import { createContext, useContext, useState } from "react";
import axios from "./Pages/plugins/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post("accounts/token/login/", {
        username,
        password,
      });
      const token = response.data.auth_token;

      const userResponse = await axios.get("accounts/users/me/", {
        headers: { Authorization: `token ${token}` },
      });

      const userRole = userResponse.data.user_role;

      if (userRole === "admin") {
        console.log("User login successful");
        setUser({ role: "admin" });
        return { role: "admin" };
      } else if (userRole === "client") {
        console.log("User login successful");
        setUser({ role: "client" });
        return { role: "client" };
      } else {
        console.log("Invalid credentials");
        setUser(null);
        return null;
      }
    } catch (error) {
      console.log("Login error:", error);
      setUser(null);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
  };

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
