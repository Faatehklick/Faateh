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

// Import your Host Dashboard pages
import HostDashboard from "../pages/Host/Dashboard";
import HostBookings from "../pages/Host/Bookings";
import HostRooms from "../pages/Host/Rooms";
import HostReviews from "../pages/Host/Reviews";
import HostSettings from "../pages/Host/Settings";
import HostProfile from "../pages/Host/Profile";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Host Dashboard Routes (Independent of MainLayout to use HostLayout shell) */}
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
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Profile Routes */}
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

        {/* Protected Host Registration Wizard */}
        <Route
          path="/become-host"
          element={
            <ProtectedRoute>
              <BecomeHost />
            </ProtectedRoute>
          }
        />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;