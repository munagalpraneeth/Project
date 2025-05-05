
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { BookingProvider } from '@/contexts/BookingContext';

const Index = () => {
  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="bg-white border-t py-6">
          <div className="container mx-auto text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} FlyAway - Flight Booking System | University Mini Project
          </div>
        </footer>
      </div>
    </BookingProvider>
  );
};

export default Index;
