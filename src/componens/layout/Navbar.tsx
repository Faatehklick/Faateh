import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, UserCircle } from "lucide-react";

import Button from "../common/Button";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 py-4">
        
        {/* Logo -> Navigates to Home Page */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-600"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="4" y="2" width="16" height="20" rx="1" />
            <path d="M9 22v-4h6v4 M9 7h1 M14 7h1 M9 11h1 M14 11h1 M9 15h1 M14 15h1" />
          </svg>
          StayEase
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-[15px] font-medium text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>

          <a
            href="/#hotels"
            className="text-[15px] font-medium text-gray-700 hover:text-blue-600"
          >
            Hotels
          </a>

          {/* Become a Host Link */}
          <Link 
            to="/become-host" 
            className="text-[15px] font-medium text-gray-700 hover:text-blue-600"
          >
            Become a Host
          </Link>

          <a
            href="/#contact"
            className="text-[15px] font-medium text-gray-700 hover:text-blue-600"
          >
            Contact
          </a>
        </nav>

        {/* Account Section */}
        <div className="hidden md:flex items-center gap-5">
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <UserCircle size={32} />
                <span className="font-medium">{user.name}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[15px] font-medium text-gray-700 hover:text-blue-600"
              >
                Sign In
              </Link>

              <Link to="/register">
                <Button variant="primary">Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col px-6 py-5 space-y-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium"
            >
              Home
            </Link>

            <a
              href="/#hotels"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium"
            >
              Hotels
            </a>

            <Link
              to="/become-host"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium"
            >
              Become a Host
            </Link>

            <a
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium"
            >
              Contact
            </a>

            <hr />

            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-gray-700 font-medium"
                >
                  <UserCircle size={28} />
                  {user.name}
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-left text-red-500 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 font-medium"
                >
                  Sign In
                </Link>

                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;