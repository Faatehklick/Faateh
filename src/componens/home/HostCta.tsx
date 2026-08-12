import { Link } from 'react-router-dom';
import hostImage from '../../assets/images/howitworks.jpg';

const perks = [
  'Free to list your hotel',
  'Get verified by admin & start accepting bookings',
  '24/7 host support team',
];

const HostCta = () => {
  return (
    <section id="host" className="max-w-7xl mx-auto px-8 pt-20">
      <div
        className="relative rounded-2xl overflow-hidden px-10 py-12 sm:px-14 sm:py-14"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(15,23,42,0.92), rgba(30,58,138,0.88)), url(${hostImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-blue-200 uppercase mb-3">
              For Hotel Owners
            </p>
            <h2 className="text-white font-bold text-3xl sm:text-4xl leading-tight mb-4">
              Own a Hotel in Somalia?<br />List Your Property Today.
            </h2>
            <p className="text-blue-100 text-[15px] leading-relaxed max-w-md">
              Reach travelers across Mogadishu, Hargeisa, Garowe, and beyond.
              Register your hotel, get verified by our team, and start receiving bookings.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <ul className="space-y-2.5">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5 text-white text-sm font-medium">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  {perk}
                </li>
              ))}
            </ul>

            {/* Navigates to the dedicated Become Host page */}
            <Link
  to="/become-host"
  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-blue-900 font-semibold text-sm px-6 py-3 rounded-lg transition-colors mt-2 text-center"
>
  Become a Host →
</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostCta;