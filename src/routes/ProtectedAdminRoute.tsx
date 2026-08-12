import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("faateh_token");
  const rawUser = localStorage.getItem("faateh_user");

  // Haddii uusan jirin token ama user, u celis bogga login-ka
  if (!token || !rawUser) {
    return <Navigate to="/admin/login" replace />;
  }

  try {
    const user = JSON.parse(rawUser);
    // Hubi inuu yahay admin dhab ah
    if (user.role !== "ADMIN") {
      localStorage.removeItem("faateh_token");
      localStorage.removeItem("faateh_user");
      return <Navigate to="/admin/login" replace />;
    }
  } catch {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};