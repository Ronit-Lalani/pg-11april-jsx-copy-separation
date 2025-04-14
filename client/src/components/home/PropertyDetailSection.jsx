import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Heart, MapPin, Wifi, Snowflake, Utensils, Shirt, Shield, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleFavorite, isFavorite } from "@/utils/localStorage";

const PropertyDetailSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  
  // For demo purposes we use a featured property
  const { data: featuredProperty, isLoading } = useQuery({
    queryKey: ['/api/properties/featured'],
    staleTime: 1000 * 60 * 5, // 5 minutes
    onSuccess: (data) => {
      if (data) {
        setIsFavorited(isFavorite(data.id.toString()));
      }
    }
  });

  const slides = [
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];

  const amenities = [
    { icon: <Wifi className="h-5 w-5 text-primary mr-2" />, name: "High-Speed WiFi" },
    { icon: <Snowflake className="h-5 w-5 text-primary mr-2" />, name: "Air Conditioning" },
    { icon: <Utensils className="h-5 w-5 text-primary mr-2" />, name: "Meals Included" },
    { icon: <Shirt className="h-5 w-5 text-primary mr-2" />, name: "Laundry Service" },
    { icon: <Shield className="h-5 w-5 text-primary mr-2" />, name: "24/7 Security" },
    { icon: <Car className="h-5 w-5 text-primary mr-2" />, name: "Parking Available" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleFavoriteToggle = () => {
    if (featuredProperty) {
      const newState = toggleFavorite(featuredProperty.id.toString());
      setIsFavorited(newState);
    }
  };

  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-900 dark:text-white">
            Featured Property
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Check out this week's featured PG accommodation
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Property Images Carousel */}
            <div className="md:w-1/2 relative">
              <div className="relative h-64 md:h-full">
                {slides.map((slide, index) => (
                  <div 
                    key={index} 
                    className={`absolute inset-0 transition-opacity duration-300 ${currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  >
                    <img 
                      src={slide} 
                      alt={`Featured Property Image ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              <button 
                onClick={prevSlide}
                className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              >
                <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              >
                <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </button>
              
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                  <button 
                    key={index}
                    className={`h-2 w-2 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white/50'}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
            
            {/* Property Details */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    Premium PG with All Amenities
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    <MapPin className="h-4 w-4 inline mr-1" /> Indira Nagar, Bengaluru
                  </p>
                </div>
                <button 
                  className="p-2 bg-white dark:bg-gray-600 rounded-full shadow-sm hover:shadow-md transition"
                  onClick={handleFavoriteToggle}
                >
                  <Heart 
                    className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} 
                  />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                  Single Room
                </span>
                <span className="bg-secondary/10 text-secondary text-xs px-3 py-1 rounded-full">
                  For Males
                </span>
                <span className="bg-accent/10 text-accent text-xs px-3 py-1 rounded-full">
                  Verified
                </span>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Luxurious PG accommodation with all modern amenities situated in a prime location with excellent connectivity to major tech parks and educational institutions. The property features spacious rooms, 24/7 security, and a vibrant community.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Room Type</h4>
                  <p className="text-gray-900 dark:text-white">Single Occupancy</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Security Deposit</h4>
                  <p className="text-gray-900 dark:text-white">₹15,000</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Food Included</h4>
                  <p className="text-gray-900 dark:text-white">Yes (3 meals/day)</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Available From</h4>
                  <p className="text-gray-900 dark:text-white">Immediate</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mb-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Amenities</h4>
                <div className="grid grid-cols-2 gap-2">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      {amenity.icon}
                      <span className="text-gray-700 dark:text-gray-300">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ₹15,000<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/month</span>
                  </p>
                </div>
                <Button>Book Now</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetailSection;
