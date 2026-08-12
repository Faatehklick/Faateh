import { Toaster } from 'react-hot-toast';

import AppRoutes from './routes/Approutes';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { HostProvider } from './context/HostContext';

function App() {
  return (
    // Order matters: BookingProvider and HostProvider both read useAuth().
    <AuthProvider>
      <HostProvider>
        <BookingProvider>
          <AppRoutes />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: { fontSize: '14px' },
              success: { iconTheme: { primary: '#059669', secondary: '#fff' } },
              error: { duration: 5000 },
            }}
          />
        </BookingProvider>
      </HostProvider>
    </AuthProvider>
  );
}

export default App;
