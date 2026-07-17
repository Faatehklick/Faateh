import { Link } from 'react-router-dom';
import hostImage from '../../assets/images/howitworks.jpg';

const perks = [
  'Free to list your property',
  'Get paid directly to your account',
  '24/7 host support team',
];

const HostCta = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 pt-20">
      <div
        className="relative rounded-2xl overflow-hidden px-10 py-12 sm:px-14 sm:py-14"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(37,95,80,0.92), rgba(29,78,180,0.88)), url(${hostImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-blue-200 uppercase mb-3">
              For Property Owners
            </p>
            <h2 className="text-white font-bold text-3xl sm:text-4xl leading-tight mb-4">
              Own a Hotel or Home?<br />Start Earning Today.
            </h2>
            <p className="text-blue-100 text-[15px] leading-relaxed max-w-md">
              Join thousands of hosts on StayEase and reach travelers from across
              Somalia and beyond. Simple setup, real income.
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

            <Link
              to="/host"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-blue-700 font-semibold text-sm px-6 py-3 rounded-lg transition-colors mt-2"
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