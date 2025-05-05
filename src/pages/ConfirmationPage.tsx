
import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Booking } from '@/data/mockData';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking as Booking | undefined;

  useEffect(() => {
    if (!booking) {
      navigate('/search');
    }
  }, [booking, navigate]);

  if (!booking) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold font-display mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-gray-600">
          Your booking reference is <span className="font-mono font-semibold">{booking.id}</span>
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <Card className="mb-8 border-green-200">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h2 className="font-medium text-lg">Flight Details</h2>
                <div className="mt-2 p-4 bg-gray-50 rounded-md">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{booking.flight.airline}</span>
                    <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                      {booking.flight.airlineCode}-{booking.flight.id.split('-')[1]}
                    </span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm">
                      {booking.flight.from} ({booking.flight.fromCode}) → {booking.flight.to} ({booking.flight.toCode})
                    </div>
                    <div className="text-sm font-medium">
                      ${booking.flight.price * booking.numTickets}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {booking.flight.departure} - {booking.flight.arrival} ({booking.flight.duration})
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-medium text-lg">Passenger Details</h2>
                <div className="mt-2 p-4 bg-gray-50 rounded-md">
                  <p><span className="text-gray-600">Name:</span> {booking.passengerName}</p>
                  <p><span className="text-gray-600">Email:</span> {booking.email}</p>
                  <p><span className="text-gray-600">Tickets:</span> {booking.numTickets}</p>
                </div>
              </div>

              <div className="text-sm text-gray-500 mt-4">
                <p>A confirmation email has been sent to {booking.email}</p>
                <p>Please arrive at the airport at least 2 hours before departure.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link to="/">Back to Home</Link>
          </Button>
          <Button asChild>
            <Link to="/bookings">View My Bookings</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
