
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BookingForm from '@/components/BookingForm';
import { useBooking } from '@/contexts/BookingContext';

const BookingPage = () => {
  const { selectedFlight } = useBooking();

  if (!selectedFlight) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">No Flight Selected</h2>
          <p className="mb-8">Please select a flight first to proceed with booking.</p>
          <Button asChild>
            <Link to="/search">Search Flights</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold font-display mb-2">
          Book Your Flight
        </h1>
        <p className="text-gray-600">
          {selectedFlight.from} ({selectedFlight.fromCode}) to {selectedFlight.to} ({selectedFlight.toCode})
        </p>
      </div>
      
      <BookingForm />
    </div>
  );
};

export default BookingPage;
