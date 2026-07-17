import { Outlet } from 'react-router-dom';
import Navbar from '../componens/layout/Navbar';
import Footer from '../componens/layout/Footer';
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;