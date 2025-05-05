
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, IndianRupee } from 'lucide-react';
import { Flight } from '@/data/mockData';
import { useBooking } from '@/contexts/BookingContext';

interface FlightCardProps {
  flight: Flight;
}

const FlightCard = ({ flight }: FlightCardProps) => {
  const navigate = useNavigate();
  const { selectFlight } = useBooking();

  const handleBookNow = () => {
    selectFlight(flight);
    navigate('/booking');
  };

  // Format price to Indian Rupees with thousands separators
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN');
  };

  return (
    <Card className="flight-card overflow-hidden border-l-4" style={{ borderLeftColor: `var(--airline-${flight.airlineColor})` }}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <span 
                className="h-3 w-3 rounded-full mr-2"
                style={{ backgroundColor: `var(--airline-${flight.airlineColor})` }}
              ></span>
              <span className="font-medium text-sm text-gray-600">{flight.airline}</span>
              <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">
                {flight.airlineCode}-{flight.id.split('-')[1]}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-3">
              <div className="text-2xl font-semibold">
                {flight.departure} <span className="text-gray-400 font-normal mx-1">→</span> {flight.arrival}
              </div>
              <div className="text-sm text-gray-500">
                Duration: {flight.duration}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 text-sm">
              <div className="flex items-center">
                <span className="font-medium">{flight.fromCode}</span>
                <ArrowRight className="mx-1 h-3 w-3" />
                <span className="font-medium">{flight.toCode}</span>
              </div>
              <div className="text-gray-500">
                ·
              </div>
              <div className="text-gray-500">
                {flight.seatsAvailable} seats available
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="text-2xl font-bold text-sky-700 mb-2 flex items-center">
              <IndianRupee className="h-5 w-5 mr-1" />
              {formatPrice(flight.price)}
            </div>
            <Button onClick={handleBookNow}>Book Now</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
