import React, { useState } from "react";
import { authApi } from "../../api/auth.api";
import toast from "react-hot-toast";

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("admin@faateh.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authApi.login({ email, password });
      
      // Kaydi token-ka iyo user-ka si sax ah
      localStorage.setItem("faateh_token", response.token);
      if (response.user) {
        localStorage.setItem("faateh_user", JSON.stringify(response.user));
      }
      
      toast.success("Successfully logged in as Admin!");
      
      // Si toos ah uga gudub dashboard-ka adigoo isticmaalaya window.location
      window.location.href = "/admin";
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to login as admin. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
          <p className="text-sm text-gray-400 mt-1">Sign in to access admin dashboard</p>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md transition duration-200 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login to Admin Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;