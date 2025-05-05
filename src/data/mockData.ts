
export type Flight = {
  id: string;
  airline: string;
  airlineCode: string;
  airlineColor: "blue" | "red" | "green" | "orange" | "purple";
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  seatsAvailable: number;
};

export type Booking = {
  id: string;
  flightId: string;
  passengerName: string;
  email: string;
  numTickets: number;
  bookingDate: string;
  flight: Flight;
};

export const airlines = [
  { name: "SkyJet Airways", code: "SJ", color: "blue" as const },
  { name: "RedWing Airlines", code: "RW", color: "red" as const },
  { name: "GreenLeaf Air", code: "GL", color: "green" as const },
  { name: "OrangeSky Flights", code: "OS", color: "orange" as const },
  { name: "PurpleCloud Airways", code: "PC", color: "purple" as const },
  { name: "Air India", code: "AI", color: "red" as const },
  { name: "IndiGo", code: "IG", color: "blue" as const },
  { name: "SpiceJet", code: "SJ", color: "orange" as const },
];

export const locations = [
  { name: "New Delhi", code: "DEL" },
  { name: "Mumbai", code: "BOM" },
  { name: "Chennai", code: "MAA" },
  { name: "Kolkata", code: "CCU" },
  { name: "Bangalore", code: "BLR" },
  { name: "Hyderabad", code: "HYD" },
  { name: "Ahmedabad", code: "AMD" },
  { name: "Kochi", code: "COK" },
  { name: "Goa", code: "GOI" },
  { name: "Jaipur", code: "JAI" },
];

// Conversion rate (1 USD = 83 INR approximately)
const USDtoINR = 83;

// Generate random duration between 1h 30m and 15h 45m
const generateRandomDuration = () => {
  const hours = Math.floor(Math.random() * 14) + 1;
  const minutes = Math.floor(Math.random() * 4) * 15;
  return `${hours}h ${minutes}m`;
};

// Generate random time in HH:MM format
const generateRandomTime = () => {
  const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
  const minutes = (Math.floor(Math.random() * 4) * 15).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Generate random price between ₹8,000 and ₹80,000
const generateRandomPrice = () => (Math.floor(Math.random() * 90000) + 8000);

// Generate random seats available between 5 and 120
const generateRandomSeats = () => Math.floor(Math.random() * 115) + 5;

// Generate a set of flights
export const generateFlights = (date: string, from: string, to: string): Flight[] => {
  if (!date || !from || !to) return [];
  if (from === to) return [];

  const fromLocation = locations.find(loc => loc.code === from);
  const toLocation = locations.find(loc => loc.code === to);
  
  if (!fromLocation || !toLocation) return [];
  
  const flights: Flight[] = [];
  
  // Generate between 0 and 8 flights
  const numFlights = Math.floor(Math.random() * 9);
  
  for (let i = 0; i < numFlights; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const departure = generateRandomTime();
    const duration = generateRandomDuration();
    
    // Calculate arrival time (simplified)
    const depHours = parseInt(departure.split(':')[0]);
    const depMinutes = parseInt(departure.split(':')[1]);
    const durationHours = parseInt(duration.split('h')[0]);
    const durationMinutes = parseInt(duration.split('h')[1].replace('m', '').trim());
    
    let arrHours = (depHours + durationHours) % 24;
    let arrMinutes = (depMinutes + durationMinutes) % 60;
    if (depMinutes + durationMinutes >= 60) arrHours = (arrHours + 1) % 24;
    
    const arrival = `${arrHours.toString().padStart(2, '0')}:${arrMinutes.toString().padStart(2, '0')}`;
    
    flights.push({
      id: `FL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      airline: airline.name,
      airlineCode: airline.code,
      airlineColor: airline.color,
      from: fromLocation.name,
      fromCode: fromLocation.code,
      to: toLocation.name,
      toCode: toLocation.code,
      departure,
      arrival,
      duration,
      price: generateRandomPrice(),
      seatsAvailable: generateRandomSeats()
    });
  }
  
  // Sort by price
  return flights.sort((a, b) => a.price - b.price);
};

// Sample stored bookings
export const storedBookings: Booking[] = [
  {
    id: "BK-5F7D3E",
    flightId: "FL-5F7D3E",
    passengerName: "Raj Kumar",
    email: "raj@example.com",
    numTickets: 2,
    bookingDate: "2023-09-15",
    flight: {
      id: "FL-5F7D3E",
      airline: "Air India",
      airlineCode: "AI",
      airlineColor: "red",
      from: "New Delhi",
      fromCode: "DEL",
      to: "Mumbai",
      toCode: "BOM",
      departure: "08:30",
      arrival: "11:45",
      duration: "3h 15m",
      price: 12500,
      seatsAvailable: 45
    }
  },
  {
    id: "BK-7A9B2C",
    flightId: "FL-7A9B2C",
    passengerName: "Priya Sharma",
    email: "priya@example.com",
    numTickets: 1,
    bookingDate: "2023-10-05",
    flight: {
      id: "FL-7A9B2C",
      airline: "IndiGo",
      airlineCode: "IG",
      airlineColor: "blue",
      from: "Bangalore",
      fromCode: "BLR",
      to: "Hyderabad",
      toCode: "HYD",
      departure: "14:15",
      arrival: "15:20",
      duration: "1h 5m",
      price: 8200,
      seatsAvailable: 12
    }
  }
];

// Function to get bookings by email
export const getBookingsByEmail = (email: string): Booking[] => {
  if (!email) return [];
  return storedBookings.filter(booking => booking.email.toLowerCase() === email.toLowerCase());
};

// Function to add a new booking
export const addBooking = (booking: Omit<Booking, "id" | "bookingDate">): Booking => {
  const newBooking: Booking = {
    ...booking,
    id: `BK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    bookingDate: new Date().toISOString().split('T')[0],
  };
  
  storedBookings.push(newBooking);
  return newBooking;
};
