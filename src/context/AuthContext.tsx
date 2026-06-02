import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  _id: string; firstName: string; lastName: string;
  email: string; accountType: "Student" | "Instructor" | "Admin"; image?: string;
}
interface AuthCtx {
  token: string | null; user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx>({} as AuthCtx);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null
  );
  const [user, setUser] = useState<User | null>(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null
  );

  const login = (t: string, u: User) => {
    setToken(t); setUser(u);
    localStorage.setItem("token", JSON.stringify(t));
    localStorage.setItem("user", JSON.stringify(u));
  };
  const logout = () => {
    setToken(null); setUser(null);
    localStorage.removeItem("token"); localStorage.removeItem("user");
  };

  return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
