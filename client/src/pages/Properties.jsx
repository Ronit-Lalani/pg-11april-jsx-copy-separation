import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyFilters from "@/components/properties/PropertyFilters";
import { saveSearchHistory } from "@/utils/localStorage";

const Properties = () => {
  const [location] = useLocation();
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: 25000,
    roomTypes: [],
    amenities: [],
    gender: ""
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Parse search params from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const locationParam = searchParams.get('location');
    const roomTypeParam = searchParams.get('roomType');
    const budgetParam = searchParams.get('budget');
    
    // Save search to history
    if (locationParam) {
      saveSearchHistory(locationParam);
    }
    
    // Update filters based on URL params
    const newFilters = { ...filters };
    if (roomTypeParam) {
      newFilters.roomTypes = [roomTypeParam];
    }
    if (budgetParam) {
      newFilters.priceRange = parseInt(budgetParam);
    }
    
    setFilters(newFilters);
    
    // Set page title
    document.title = `Properties ${locationParam ? `in ${locationParam}` : ''} - StayEase`;
  }, [location]);

  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['/api/properties', { ...filters, page: currentPage, location: new URLSearchParams(window.location.search).get('location') }],
  });

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
    setCurrentPage(1); // Reset to first page when filters change
  };

  const totalPages = 8; // This would come from API in a real app

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-poppins font-bold text-gray-900 dark:text-white">
              PG Accommodations
              {new URLSearchParams(window.location.search).get('location') && 
                ` in ${new URLSearchParams(window.location.search).get('location')}`}
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              {properties?.length || 0} properties found
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={toggleFilters} 
            className="mt-4 md:mt-0 md:hidden"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Panel */}
          <PropertyFilters 
            isVisible={showFilters} 
            filters={filters} 
            onFilterChange={handleFilterChange} 
          />
          
          {/* Property Listings */}
          <div className="w-full">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-500">Error loading properties. Please try again later.</p>
              </div>
            ) : properties && properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 dark:text-gray-400">No properties found matching your criteria.</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setFilters({
                      priceRange: 25000,
                      roomTypes: [],
                      amenities: [],
                      gender: ""
                    });
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
            
            {properties && properties.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <Button 
                    variant="outline" 
                    className="rounded-l-md"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      className={currentPage === page ? "bg-primary text-white" : ""}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    className="rounded-r-md"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
