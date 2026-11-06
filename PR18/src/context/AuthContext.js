import React, { createContext, useContext, useState } from 'react';

// Учебная авторизация: пользователь хранится только в состоянии, без сервера и паролей
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = name => setUser({ name });
  const logout = () => setUser(null);
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
