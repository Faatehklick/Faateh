import Hero from '../../componens/home/Hero';
import FeaturedHotels from '../../componens/home/FeaturedHotels';
import FeaturedHouses from '../../componens/home/FeaturedHouses';
import WhyChooseUs from '../../componens/home/WhyChooseUs';
import HostCta from '../../componens/home/HostCta';
import HowItWorks from '../../componens/home/HowItWorks';

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedHotels />
      <FeaturedHouses />
      <WhyChooseUs />
      <HostCta />
      <HowItWorks />
    </>
  );
};

export default Home;