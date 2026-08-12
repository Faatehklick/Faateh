import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/Profile/EditProfile";
import Reviews from "../pages/Profile/Reviews";

import BecomeHost from "../pages/BecomeHost/BecomeHost";
import NotFound from "../pages/NotFound/NotFound";

// Host Dashboard pages
import HostDashboard from "../pages/Host/Dashboard";
import HostBookings from "../pages/Host/Bookings";
import HostRooms from "../pages/Host/Rooms";
import HostReviews from "../pages/Host/Reviews";
import HostSettings from "../pages/Host/Settings";
import HostProfile from "../pages/Host/Profile";

// Admin Dashboard & Login
import { AdminDashboard } from "../componens/dashboard/admin/AdminDashboard";
import AdminLogin from "../pages/Admin/AdminLogin";
import ProtectedRoute from "./ProtectedRoute";
import { ProtectedAdminRoute } from "./ProtectedAdminRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Admin Authentication - Waa inuu ahaadaa mid furan */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Dashboard Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
      
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />

      {/* Host Dashboard Routes */}
      <Route
        path="/host/dashboard"
        element={
          <ProtectedRoute>
            <HostDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/host/bookings"
        element={
          <ProtectedRoute>
            <HostBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/host/rooms"
        element={
          <ProtectedRoute>
            <HostRooms />
          </ProtectedRoute>
        }
      />
      <Route
        path="/host/reviews"
        element={
          <ProtectedRoute>
            <HostReviews />
          </ProtectedRoute>
        }
      />
      <Route
        path="/host/settings"
        element={
          <ProtectedRoute>
            <HostSettings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/host/profile"
        element={
          <ProtectedRoute>
            <HostProfile />
          </ProtectedRoute>
        }
      />

      {/* Main Public & Profile Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/reviews"
          element={
            <ProtectedRoute>
              <Reviews />
            </ProtectedRoute>
          }
        />

        <Route
          path="/become-host"
          element={
            <ProtectedRoute>
              <BecomeHost />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;