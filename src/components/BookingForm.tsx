
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useBooking } from '@/contexts/BookingContext';
import { IndianRupee } from 'lucide-react';

const BookingSchema = z.object({
  passengerName: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  numTickets: z.coerce.number().int().min(1).max(5),
});

type BookingFormValues = z.infer<typeof BookingSchema>;

const BookingForm = () => {
  const { selectedFlight, bookFlight } = useBooking();
  const navigate = useNavigate();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      passengerName: '',
      email: '',
      numTickets: 1,
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    const booking = await bookFlight(
      data.passengerName,
      data.email,
      data.numTickets
    );
    
    if (booking) {
      navigate('/booking/confirmation', { state: { booking } });
    }
  };

  if (!selectedFlight) {
    navigate('/search');
    return null;
  }

  // Format price to Indian Rupees with thousands separators
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN');
  };

  const totalPrice = selectedFlight.price * (form.watch('numTickets') || 1);

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Complete Your Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 bg-sky-50 rounded-md">
          <h3 className="font-medium text-lg mb-2">{selectedFlight.airline}</h3>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">
              {selectedFlight.fromCode} → {selectedFlight.toCode}
            </span>
            <span className="font-semibold flex items-center">
              <IndianRupee className="h-4 w-4 mr-1" />
              {formatPrice(selectedFlight.price)}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {selectedFlight.departure} - {selectedFlight.arrival} ({selectedFlight.duration})
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="passengerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passenger Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="numTickets"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Tickets</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of tickets" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-4 border-t mt-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total Price:</span>
                <span className="font-bold text-lg flex items-center">
                  <IndianRupee className="h-5 w-5 mr-1" />
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <Button type="submit" className="w-full">
                Confirm Booking
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
