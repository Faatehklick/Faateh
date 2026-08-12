import Hero from '../../componens/home/Hero';
import FeaturedHotels from '../../componens/home/FeaturedHotels';
import WhyChooseUs from '../../componens/home/WhyChooseUs';
import HostCta from '../../componens/home/HostCta';
import HowItWorks from '../../componens/home/HowItWorks';
// import AuthSection from '../../componens/home/AuthSection';
import ContactSection from '../../componens/home/ContactSection';

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedHotels />
      <WhyChooseUs />
      <HostCta />
      <HowItWorks />
      {/* <AuthSection /> */}
      <ContactSection />
    </>
  );
};

export default Home;