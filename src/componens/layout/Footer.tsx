import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900">
      <div className="max-w-7xl mx-auto px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-14">
          <div>
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="2" width="16" height="20" rx="1" />
                <path d="M9 22v-4h6v4M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" />
              </svg>
              StayEase
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs mb-8">
              Connecting travelers with verified hotels and homes across Somalia. Simple booking, trusted hosts, real support.
            </p>

            <div className="space-y-3">
              <a href="mailto:support@stayease.so" className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </span>
             faateh209@gmail.com
              </a>
              <a href="tel:+252123456789" className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                +252 123 456 789
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider mb-5">Explore</h5>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-white/60 hover:text-white transition-colors">Home</Link></li>
              <li><a href="#hotels" className="text-sm text-white/60 hover:text-white transition-colors">Hotels</a></li>
              <li><a href="#host" className="text-sm text-white/60 hover:text-white transition-colors">Become a Host</a></li>
              <li><a href="#contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider mb-5">Account</h5>
            <ul className="space-y-3">
              <li><a href="#auth" className="text-sm text-white/60 hover:text-white transition-colors">Sign In</a></li>
              <li><a href="#auth" className="text-sm text-white/60 hover:text-white transition-colors">Register</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider mb-5">Stay in the loop</h5>
            <p className="text-sm text-white/50 mb-4 leading-relaxed">
              Get new listings and travel tips for Somalia, straight to your inbox.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-3 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">Copyright 2026 StayEase. All rights reserved.</p>
          <p className="text-xs text-white/40">Made for travelers across Somalia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;