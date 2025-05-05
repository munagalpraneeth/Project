
import { createContext, useContext, useState, ReactNode } from 'react';
import { Flight, Booking, generateFlights, addBooking as addBookingToDb, getBookingsByEmail } from '../data/mockData';
import { toast } from '../components/ui/use-toast';

interface BookingContextType {
  flights: Flight[];
  selectedFlight: Flight | null;
  searchParams: {
    from: string;
    to: string;
    date: string;
  };
  bookings: Booking[];
  searchFlights: (from: string, to: string, date: string) => void;
  selectFlight: (flight: Flight) => void;
  bookFlight: (passengerName: string, email: string, numTickets: number) => Promise<Booking | null>;
  getMyBookings: (email: string) => void;
}

const defaultContext: BookingContextType = {
  flights: [],
  selectedFlight: null,
  searchParams: {
    from: '',
    to: '',
    date: '',
  },
  bookings: [],
  searchFlights: () => {},
  selectFlight: () => {},
  bookFlight: async () => null,
  getMyBookings: () => {},
};

const BookingContext = createContext<BookingContextType>(defaultContext);

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
  });
  const [bookings, setBookings] = useState<Booking[]>([]);

  const searchFlights = (from: string, to: string, date: string) => {
    // Simulate API call delay
    setTimeout(() => {
      const results = generateFlights(date, from, to);
      setFlights(results);
      setSearchParams({ from, to, date });
      if (results.length === 0) {
        toast({
          title: "No flights found",
          description: "Try different dates or destinations",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Flights found",
          description: `Found ${results.length} flights for your search`
        });
      }
    }, 1000);
  };

  const selectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
  };

  const bookFlight = async (passengerName: string, email: string, numTickets: number): Promise<Booking | null> => {
    if (!selectedFlight) return null;

    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        if (selectedFlight.seatsAvailable < numTickets) {
          toast({
            title: "Booking failed",
            description: `Only ${selectedFlight.seatsAvailable} seats available`,
            variant: "destructive"
          });
          resolve(null);
          return;
        }

        const newBooking = addBookingToDb({
          flightId: selectedFlight.id,
          passengerName,
          email,
          numTickets,
          flight: selectedFlight
        });

        setBookings(prev => [...prev, newBooking]);
        toast({
          title: "Booking successful",
          description: `Your booking reference is ${newBooking.id}`
        });
        resolve(newBooking);
      }, 1500);
    });
  };

  const getMyBookings = (email: string) => {
    // Simulate API call delay
    setTimeout(() => {
      const userBookings = getBookingsByEmail(email);
      setBookings(userBookings);
      if (userBookings.length === 0) {
        toast({
          title: "No bookings found",
          description: "We couldn't find any bookings with this email"
        });
      }
    }, 1000);
  };

  return (
    <BookingContext.Provider value={{
      flights,
      selectedFlight,
      searchParams,
      bookings,
      searchFlights,
      selectFlight,
      bookFlight,
      getMyBookings,
    }}>
      {children}
    </BookingContext.Provider>
  );
};
