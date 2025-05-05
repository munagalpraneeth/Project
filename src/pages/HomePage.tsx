import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plane, Search, Ticket, Check } from 'lucide-react';
import FlightSearchForm from '@/components/FlightSearchForm';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sky-50 to-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-sky-100 rounded-full mb-4">
              <Plane className="h-8 w-8 text-sky-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Book Your Flight with <span className="text-sky-600">FlyAway</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Find and book flights to destinations worldwide at the best prices. Easy, fast, and reliable.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12 animate-fade-in">
            <h2 className="text-xl font-semibold mb-6">Find Your Next Flight</h2>
            <FlightSearchForm />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold font-display text-center mb-12">Why Choose FlyAway?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-sky-100 p-3 rounded-full mb-4">
                <Search className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Search</h3>
              <p className="text-gray-600">
                Quickly search for flights to your desired destination with our simple search interface.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-sky-100 p-3 rounded-full mb-4">
                <Ticket className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Simple Booking</h3>
              <p className="text-gray-600">
                Book your flights in just a few clicks with our streamlined booking process.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-sky-100 p-3 rounded-full mb-4">
                <Check className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Manage Bookings</h3>
              <p className="text-gray-600">
                Easily view and manage all of your bookings in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-sky-50">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold font-display mb-6">Ready to Book Your Next Trip?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Start searching for flights now and find the perfect option for your travel needs.
          </p>
          <Button asChild size="lg">
            <Link to="/search">Search Flights</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
