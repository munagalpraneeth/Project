
import { Card, CardContent } from '@/components/ui/card';
import { Booking } from '@/data/mockData';
import { IndianRupee } from 'lucide-react';

interface BookingCardProps {
  booking: Booking;
}

const BookingCard = ({ booking }: BookingCardProps) => {
  // Format price to Indian Rupees with thousands separators
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN');
  };

  const totalPrice = booking.flight.price * booking.numTickets;

  return (
    <Card className="w-full overflow-hidden border-l-4" style={{ borderLeftColor: `var(--airline-${booking.flight.airlineColor})` }}>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{booking.flight.airline}</h3>
              <p className="text-sm text-gray-500">
                Booking Reference: <span className="font-mono">{booking.id}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Booked on {booking.bookingDate}
              </p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-sky-700 flex items-center justify-end">
                <IndianRupee className="h-5 w-5 mr-1" />
                {formatPrice(totalPrice)}
              </div>
              <div className="text-sm text-gray-500">
                {booking.numTickets} {booking.numTickets === 1 ? 'ticket' : 'tickets'}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between mb-2">
              <div>
                <div className="font-medium">{booking.flight.fromCode} → {booking.flight.toCode}</div>
                <div className="text-sm text-gray-500">
                  {booking.flight.from} to {booking.flight.to}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{booking.flight.departure} - {booking.flight.arrival}</div>
                <div className="text-sm text-gray-500">Duration: {booking.flight.duration}</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Passenger Details</h4>
            <p className="text-sm">{booking.passengerName} | {booking.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
