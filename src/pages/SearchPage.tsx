
import FlightSearchForm from '@/components/FlightSearchForm';

const SearchPage = () => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold font-display mb-8 text-center">
          Find Your Perfect Flight
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl">
          <FlightSearchForm />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
