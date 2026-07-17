import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white/80 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
        <div>
          <h3 className="text-white font-bold text-lg mb-2">StayEase</h3>
          <p className="text-sm text-white/60 max-w-[220px]">
            Find and book hotels, houses, and rooms with confidence.
          </p>
        </div>
        <div>
          <h5 className="text-white text-xs uppercase tracking-wide font-semibold mb-3">Explore</h5>
          <ul className="space-y-2 text-sm">
            <li><Link to="/hotels" className="hover:text-white">Hotels</Link></li>
            <li><Link to="/houses" className="hover:text-white">Houses</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white text-xs uppercase tracking-wide font-semibold mb-3">Hosting</h5>
          <ul className="space-y-2 text-sm">
            <li><Link to="/host" className="hover:text-white">Become a Host</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white text-xs uppercase tracking-wide font-semibold mb-3">Support</h5>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
      </div>
      <p className="text-center text-xs text-white/40 mt-8">© 2026 StayEase. All rights reserved.</p>
    </footer>
  );
};

export default Footer;