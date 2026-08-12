import SearchBar from './SearchBar';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/images/hero.jpg';

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex items-center bg-cover bg-center pt-32 pb-20"
      style={{
        backgroundImage: `linear-gradient(rgba(8,20,40,0.55), rgba(8,20,40,0.85)), url(${heroImage})`,
      }}
    >
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-amber-400 px-4 py-1.5 rounded-full text-[12px] font-semibold uppercase tracking-wide mb-6">
          ★ Trusted by 50,000+ travelers worldwide
        </div>

        <h1 className="text-white font-extrabold leading-tight text-4xl sm:text-5xl md:text-6xl mb-5">
          Find Your <span className="text-amber-400">Perfect</span> Stay
        </h1>

        <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          Discover amazing hotels and vacation homes at unbeatable prices.
          Book with confidence.
        </p>

        <div className="flex items-center justify-center gap-4 mb-10">
    <Link to="/host/dashboard">
  <Button variant="primary" className="px-8 py-3">
    Explore
  </Button>
</Link>   <Link to="/host">
            <button className="border border-white/40 text-white font-semibold text-[15px] px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
              Become Host
            </button>
          </Link>
        </div>

        <SearchBar />
      </div>
    </section>
  );
};

export default Hero;