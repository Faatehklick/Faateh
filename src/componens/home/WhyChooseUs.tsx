import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Verified Listings',
    desc: 'Every hotel and house is personally checked by our team before it goes live.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    title: 'Best Price Guarantee',
    desc: 'Find it cheaper elsewhere? We match the price, no questions asked.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    title: 'Secure Payments',
    desc: 'Every transaction is encrypted and protected, so you can pay with confidence.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    title: '24/7 Guest Support',
    desc: 'Our support team is available around the clock, wherever you are staying.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12h4l3 8 4-16 3 8h4" />
      </svg>
    ),
  },
];

const WhyChooseUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* left column */}
        <div>
          <p className="text-xs font-bold tracking-[0.15em] text-blue-600 uppercase mb-4">Features</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Why People<br />
            <span className="text-blue-600">Choose StayEase</span>
          </h2>
          <p className="text-gray-500 text-[15px] leading-relaxed mb-8 max-w-md">
            We check every listing before it goes live, guarantee the best price you'll find,
            and keep support on standby around the clock — so you can book with confidence
            anywhere in Somalia.
          </p>
          <Link
            to="/hotels"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold tracking-wide uppercase px-7 py-3.5 rounded-md transition-colors"
          >
            Find a Stay
          </Link>
        </div>

        {/* right column: 2x2 feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`py-6 ${i < 2 ? 'sm:border-b sm:border-gray-200' : ''} ${
                i % 2 === 0 ? 'sm:border-r sm:border-gray-200 sm:pr-8' : 'sm:pl-8'
              } ${i === 0 ? 'sm:pt-0' : ''} ${i === 1 ? 'sm:pt-0' : ''}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-blue-600">{feature.icon}</span>
                <h3 className="font-semibold text-slate-900 text-[17px]">{feature.title}</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;