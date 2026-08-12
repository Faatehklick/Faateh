import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import type { Role } from "../types/user";

interface ProtectedRouteProps {
  children: ReactNode;
  /** When set, the user must hold one of these roles. */
  roles?: Role[];
}

const FullPageSpinner = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
    <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
    <p className="text-sm text-gray-500">Checking your session…</p>
  </div>
);

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Wait for GET /auth/me before deciding, otherwise a refresh on a protected
  // page would bounce the user to /login every time.
  if (isLoading) return <FullPageSpinner />;

  if (!isAuthenticated) {
    return (
      <Navigate to="/login" state={{ from: location.pathname }} replace />
    );
  }

  if (roles?.length && user && !roles.includes(user.role)) {
    // Signed in but lacking the role — send them somewhere they can actually use.
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
