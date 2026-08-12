const ContactSection = () => {
  return (
    <section id="contact" className="relative py-20 px-4 overflow-hidden bg-white">
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10px, -15px) scale(1.05); }
        }
        @keyframes floatSlowReverse {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-12px, 12px) scale(1.08); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .anim-float-1 { animation: floatSlow 6s ease-in-out infinite; }
        .anim-float-2 { animation: floatSlowReverse 8s ease-in-out infinite; }
        .anim-pulse-glow { animation: pulseGlow 4s ease-in-out infinite; }
      `}</style>

      <div className="text-center mb-12">
        <p className="text-xs font-bold tracking-[0.15em] text-blue-600 uppercase mb-3">Get In Touch</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Contact us</h2>
      </div>

      <div className="relative max-w-6xl mx-auto bg-gray-50 rounded-2xl shadow-xl p-10 sm:p-14 overflow-hidden">
        <div className="absolute top-6 left-6 w-14 h-14 rounded-full border-8 border-blue-300 opacity-50 anim-pulse-glow" />
        <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-blue-100 translate-x-1/4 translate-y-1/4 anim-float-1" />
        <div className="absolute top-1/3 right-10 w-24 h-24 rounded-full bg-blue-200 opacity-30 anim-float-2" />

        <div className="relative grid grid-cols-1 md:grid-cols-[1.2fr_0.9fr] gap-10 items-start">
          <div>
            <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-sm">
              Please don't hesitate to reach out to us whenever you need assistance.
              We'll make sure to respond to you promptly.
            </p>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Name"
                className="w-full border-b border-gray-200 pb-2 text-sm outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400 bg-transparent"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border-b border-gray-200 pb-2 text-sm outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400 bg-transparent"
              />
              <input
                type="text"
                placeholder="Message"
                className="w-full border-b border-gray-200 pb-2 text-sm outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400 bg-transparent"
              />

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-3 rounded-lg transition-colors mt-4"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="relative bg-slate-900 rounded-2xl p-8 text-white">
            <h3 className="text-lg font-bold mb-6">Info</h3>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-500/20 text-blue-400 shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </span>
                <span className="text-sm text-white/90">             faateh209@gmail.com
</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-500/20 text-blue-400 shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                <span className="text-sm text-white/90">+252 123 456 789</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-500/20 text-blue-400 shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span className="text-sm text-white/90">Mogadishu, Somalia</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-500/20 text-blue-400 shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </span>
                <span className="text-sm text-white/90">09:00 - 18:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;