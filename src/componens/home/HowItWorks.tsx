const steps = [
  {
    step: 'Step 01',
    title: 'Search',
    desc: 'Enter your destination, travel dates, and number of guests to see available properties.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    step: 'Step 02',
    title: 'Book',
    desc: 'Select your ideal property, choose your dates, and confirm with our secure payment system.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    step: 'Step 03',
    title: 'Stay',
    desc: 'Check in and enjoy your stay. Our support team is available if you need anything.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12l9-9 9 9" />
        <path d="M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" />
      </svg>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section className="max-w-6xl mx-auto px-8 py-20 text-center">
      <p className="text-xs font-bold tracking-[0.15em] text-blue-600 uppercase mb-3">Simple Process</p>
      <h2 className="text-4xl font-bold text-slate-900 mb-3">How It Works</h2>
      <p className="text-gray-500 mb-16">Three steps to your perfect Somali getaway</p>

      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-14 sm:gap-8">
        <div className="hidden sm:block absolute top-8 left-[16.5%] right-[16.5%] h-px bg-gray-200" />

        {steps.map((s) => (
          <div key={s.title} className="relative flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 relative z-10">
              {s.icon}
            </div>
            <span className="text-[11px] font-bold tracking-wide text-blue-600 uppercase mb-1">{s.step}</span>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{s.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[240px]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;