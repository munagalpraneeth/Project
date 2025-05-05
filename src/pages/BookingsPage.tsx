
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import BookingCard from '@/components/BookingCard';
import { useBooking } from '@/contexts/BookingContext';
import { Ticket } from 'lucide-react';

const EmailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type EmailFormValues = z.infer<typeof EmailSchema>;

const BookingsPage = () => {
  const { bookings, getMyBookings } = useBooking();
  const [hasSearched, setHasSearched] = useState(false);

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: EmailFormValues) => {
    getMyBookings(data.email);
    setHasSearched(true);
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold font-display mb-4">My Bookings</h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Enter your email address to retrieve your flight bookings.
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <Input
                        placeholder="email@example.com"
                        className="flex-1"
                        {...field}
                      />
                      <Button type="submit">
                        Find Bookings
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      {hasSearched && (
        <div className="space-y-4">
          {bookings.length > 0 ? (
            <>
              <h2 className="text-xl font-medium mb-6">
                Your Bookings ({bookings.length})
              </h2>
              {bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <div className="inline-flex items-center justify-center p-3 bg-gray-100 rounded-full mb-4">
                <Ticket className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No Bookings Found</h3>
              <p className="text-gray-600">
                We couldn't find any bookings associated with this email.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
