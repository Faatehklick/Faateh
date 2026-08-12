import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Verified Listings',
    desc: 'Every hotel and house is personally checked by our team.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" />
        <path d="M9 12l2 2 4-4.5" />
      </svg>
    ),
  },
  {
    title: 'Best Price Guarantee',
    desc: 'Find it cheaper elsewhere? We match the price.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="8" r="5" />
        <circle cx="16" cy="16" r="5" />
        <path d="M8 8h.01M16 16h.01" />
      </svg>
    ),
  },
  {
    title: 'Secure Payments',
    desc: 'Every transaction is encrypted and protected.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: '24/7 Guest Support',
    desc: 'Our support team is available around the clock.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 13a8 8 0 0116 0" />
        <rect x="2" y="13" width="5" height="7" rx="1.5" />
        <rect x="17" y="13" width="5" height="7" rx="1.5" />
        <path d="M20 20v1a3 3 0 01-3 3h-3" />
      </svg>
    ),
  },
];

const WhyChooseUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Section */}
        <div>
          <p className="uppercase text-xs font-bold tracking-[0.2em] text-blue-600 mb-4">
            Features
          </p>

          <h2 className="text-4xl font-bold text-slate-900 leading-tight mb-6">
            Why People{' '}
            <span className="text-blue-600">
              Choose Us?
            </span>
          </h2>

          <p className="text-gray-500 leading-7 max-w-md mb-8">
            We check every listing before it goes live, guarantee the best
            price you'll find, and keep support on standby around the clock.
          </p>

          <Link
            to="/hotels"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-7 py-3 rounded-md transition"
          >
            Find a Stay
          </Link>
        </div>

        {/* Right Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2">

          {/* Left Column */}
          <div className="sm:border-r border-gray-300">
            {features.slice(0, 2).map((feature, index) => (
              <div
                key={feature.title}
                className={`flex items-start gap-4 px-6 py-8 ${
                  index === 0 ? 'border-b border-gray-300' : ''
                }`}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-blue-600 text-blue-600 shrink-0">
                  {feature.icon}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-6">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div>
            {features.slice(2, 4).map((feature, index) => (
              <div
                key={feature.title}
                className={`flex items-start gap-4 px-6 py-8 ${
                  index === 0 ? 'border-b border-gray-300' : ''
                }`}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-blue-600 text-blue-600 shrink-0">
                  {feature.icon}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-6">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;