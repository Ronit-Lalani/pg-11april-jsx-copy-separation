import { useState } from "react";
import { Link } from "wouter";
import { Heart, MapPin, ArrowRight, Wifi, ShowerHead, UtensilsCrossed, Car, Users, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toggleFavorite, isFavorite } from "@/utils/localStorage";

const PropertyCard = ({ property }) => {
  const [favorited, setFavorited] = useState(() => isFavorite(property.id.toString()));
  
  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleFavorite(property.id.toString());
    setFavorited(newState);
  };

  const getBadgeColor = (roomType) => {
    switch (roomType.toLowerCase()) {
      case 'single room':
        return 'bg-primary';
      case 'shared room':
        return 'bg-secondary';
      case 'studio apartment':
        return 'bg-accent';
      case '1 bhk flat':
        return 'bg-indigo-700';
      default:
        return 'bg-gray-500';
    }
  };

  // Format amenities for display
  const amenities = Array.isArray(property.amenities) ? property.amenities : [];

  // Get appropriate icon for amenity
  const getAmenityIcon = (amenity) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes('wifi') || lowerAmenity.includes('internet')) return <Wifi className="h-3 w-3" />;
    if (lowerAmenity.includes('parking') || lowerAmenity.includes('car')) return <Car className="h-3 w-3" />;
    if (lowerAmenity.includes('food') || lowerAmenity.includes('meals')) return <UtensilsCrossed className="h-3 w-3" />;
    if (lowerAmenity.includes('bathroom') || lowerAmenity.includes('shower')) return <ShowerHead className="h-3 w-3" />;
    return <Star className="h-3 w-3" />;
  };

  // Get gender badge
  const getGenderBadge = () => {
    if (!property.gender) return null;
    
    let color = '';
    if (property.gender.toLowerCase() === 'male') color = 'bg-blue-500';
    else if (property.gender.toLowerCase() === 'female') color = 'bg-pink-500';
    else color = 'bg-purple-500';

    return (
      <Badge className={cn("absolute top-2 left-2", color)}>
        <Users className="h-3 w-3 mr-1" /> {property.gender}
      </Badge>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
      <div className="relative">
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
        />
        <button 
          className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-all duration-200 z-10"
          onClick={handleFavoriteToggle}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-5 w-5 ${favorited ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} />
        </button>
        
        {getGenderBadge()}
        
        <div className={`absolute bottom-2 left-2 ${getBadgeColor(property.roomType)} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm`}>
          {property.roomType}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">{property.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-start">
          <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0 text-gray-400" /> 
          <span className="line-clamp-1">{property.address}, {property.city}</span>
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="outline" className="py-1 px-2 bg-gray-50 dark:bg-gray-700 flex items-center gap-1 text-xs">
              {getAmenityIcon(amenity)}
              {amenity}
            </Badge>
          ))}
          {amenities.length > 3 && (
            <Badge variant="outline" className="py-1 px-2 bg-gray-50 dark:bg-gray-700">
              +{amenities.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
          <div>
            <p className="text-xl font-bold text-primary">
              ₹{property.price.toLocaleString('en-IN')}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/month</span>
            </p>
          </div>
          <Link 
            href={`/property/${property.id}`} 
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors rounded-md"
          >
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
