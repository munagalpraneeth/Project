
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import FlightCard from '@/components/FlightCard';
import { Plane, IndianRupee } from 'lucide-react';

const ResultsPage = () => {
  const { flights, searchParams } = useBooking();
  const [sortBy, setSortBy] = useState<'price' | 'duration'>('price');

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    }
    
    // Simple duration sorting - parse the hours and minutes
    const aDuration = a.duration.split('h ');
    const bDuration = b.duration.split('h ');
    const aHours = parseInt(aDuration[0]);
    const aMinutes = parseInt(aDuration[1]);
    const bHours = parseInt(bDuration[0]);
    const bMinutes = parseInt(bDuration[1]);
    
    return (aHours * 60 + aMinutes) - (bHours * 60 + bMinutes);
  });

  if (!searchParams.from || !searchParams.to || !searchParams.date) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">No Search Criteria</h2>
          <p className="mb-8">Please search for flights first.</p>
          <Button asChild>
            <Link to="/search">Go to Search</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display mb-2">
          Flights from {searchParams.from} to {searchParams.to}
        </h1>
        <p className="text-gray-600">
          Date: {searchParams.date} · {flights.length} flights found
        </p>
      </div>
      
      {flights.length > 0 ? (
        <>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-lg font-medium">Flight Results</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Button 
                variant={sortBy === 'price' ? "default" : "outline"} 
                size="sm"
                onClick={() => setSortBy('price')}
                className="flex items-center"
              >
                <IndianRupee className="h-3 w-3 mr-1" /> Price
              </Button>
              <Button 
                variant={sortBy === 'duration' ? "default" : "outline"} 
                size="sm"
                onClick={() => setSortBy('duration')}
              >
                Duration
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {sortedFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="inline-flex items-center justify-center p-3 bg-gray-100 rounded-full mb-4">
            <Plane className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No Flights Found</h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any flights matching your search criteria.
          </p>
          <Button asChild>
            <Link to="/search">Search Again</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
