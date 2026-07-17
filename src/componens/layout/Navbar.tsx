import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../common/Button';

const Navbar = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      className={`text-[15px] font-medium transition-colors ${
        scrolled
          ? isActive(to)
            ? 'text-blue-600'
            : 'text-gray-700 hover:text-blue-600'
          : isActive(to)
          ? 'text-white'
          : 'text-white/80 hover:text-white'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white border-b border-gray-100 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <Link
          to="/"
          className={`flex items-center gap-2 text-xl font-bold transition-colors ${
            scrolled ? 'text-blue-600' : 'text-white'
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="2" width="16" height="20" rx="1" />
            <path d="M9 22v-4h6v4M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" />
          </svg>
          StayEase
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLink('/', 'Home')}
          {navLink('/hotels', 'Hotels')}
          {navLink('/houses', 'Houses')}
          {navLink('/host', 'Become a Host')}
          {navLink('/contact', 'Contact')}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            to="/login"
            className={`text-[15px] font-medium transition-colors ${
              scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white'
            }`}
          >
            Sign In
          </Link>
          <Link to="/register">
            <Button variant="primary">Register</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;