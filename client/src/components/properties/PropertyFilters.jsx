import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Wifi, 
  Bed, 
  DoorOpen, 
  Bath, 
  Home, 
  UtensilsCrossed, 
  Car, 
  CircleDollarSign,
  ArrowDownUp,
  Users,
  Trash
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PropertyFilters = ({ isVisible, filters, onFilterChange }) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState(filters.roomTypes);
  const [selectedAmenities, setSelectedAmenities] = useState(filters.amenities);
  const [selectedGender, setSelectedGender] = useState(filters.gender);

  useEffect(() => {
    setPriceRange(filters.priceRange);
    setSelectedRoomTypes(filters.roomTypes);
    setSelectedAmenities(filters.amenities);
    setSelectedGender(filters.gender);
  }, [filters]);

  const handleRoomTypeChange = (type) => {
    const updated = selectedRoomTypes.includes(type)
      ? selectedRoomTypes.filter(t => t !== type)
      : [...selectedRoomTypes, type];
    setSelectedRoomTypes(updated);
  };

  const handleAmenityChange = (amenity) => {
    const updated = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter(a => a !== amenity)
      : [...selectedAmenities, amenity];
    setSelectedAmenities(updated);
  };

  const applyFilters = () => {
    onFilterChange({
      priceRange,
      roomTypes: selectedRoomTypes,
      amenities: selectedAmenities,
      gender: selectedGender
    });
  };

  const resetFilters = () => {
    setPriceRange(25000);
    setSelectedRoomTypes([]);
    setSelectedAmenities([]);
    setSelectedGender("");
    onFilterChange({
      priceRange: 25000,
      roomTypes: [],
      amenities: [],
      gender: ""
    });
  };

  const roomTypes = [
    { id: 'single', label: 'Single Room', icon: <Bed className="h-4 w-4" /> },
    { id: 'shared', label: 'Shared Room', icon: <Users className="h-4 w-4" /> },
    { id: 'flat', label: '1 BHK Flat', icon: <Home className="h-4 w-4" /> },
    { id: 'studio', label: 'Studio Apartment', icon: <DoorOpen className="h-4 w-4" /> }
  ];

  const amenities = [
    { id: 'wifi', label: 'WiFi', icon: <Wifi className="h-4 w-4" /> },
    { id: 'ac', label: 'AC', icon: <Bath className="h-4 w-4" /> },
    { id: 'food', label: 'Food Included', icon: <UtensilsCrossed className="h-4 w-4" /> },
    { id: 'laundry', label: 'Laundry', icon: <Bath className="h-4 w-4" /> },
    { id: 'parking', label: 'Parking', icon: <Car className="h-4 w-4" /> }
  ];
  
  // Count active filters
  const activeFilterCount = 
    (selectedRoomTypes.length > 0 ? 1 : 0) + 
    (selectedAmenities.length > 0 ? 1 : 0) + 
    (selectedGender ? 1 : 0) + 
    (priceRange !== 25000 ? 1 : 0);

  return (
    <div className={`${isVisible ? 'block' : 'hidden md:block'} w-full md:w-72 bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md sticky top-20 self-start border border-gray-100 dark:border-gray-700`}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-gray-900 dark:text-white text-xl flex items-center">
          <ArrowDownUp className="mr-2 h-5 w-5 text-primary" /> 
          Filters
          {activeFilterCount > 0 && (
            <Badge className="ml-2 bg-primary text-white">{activeFilterCount}</Badge>
          )}
        </h3>
        {activeFilterCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <Trash className="h-4 w-4 mr-1" /> Clear all
          </Button>
        )}
      </div>
      
      <Accordion type="multiple" defaultValue={["price", "room-type", "amenities", "gender"]} className="space-y-4">
        <AccordionItem value="price" className="border-b-0">
          <AccordionTrigger className="py-3 text-base font-medium hover:no-underline">
            <div className="flex items-center">
              <CircleDollarSign className="mr-2 h-5 w-5 text-primary" />
              <span>Budget</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-2 pb-4">
              <div className="flex items-center mb-4">
                <Slider 
                  value={[priceRange]} 
                  min={1000} 
                  max={50000} 
                  step={1000}
                  onValueChange={(value) => setPriceRange(value[0])} 
                  className="w-full"
                />
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">₹1,000</span>
                <span className="text-sm font-medium text-primary">₹{priceRange.toLocaleString('en-IN')}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">₹50,000</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {[5000, 10000, 15000, 20000, 25000].map(price => (
                  <Badge 
                    key={price}
                    variant={priceRange === price ? "default" : "outline"}
                    className={`cursor-pointer ${priceRange === price ? 'bg-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    onClick={() => setPriceRange(price)}
                  >
                    ₹{price.toLocaleString('en-IN')}
                  </Badge>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="room-type" className="border-b-0">
          <AccordionTrigger className="py-3 text-base font-medium hover:no-underline">
            <div className="flex items-center">
              <Bed className="mr-2 h-5 w-5 text-primary" />
              <span>Room Type</span>
              {selectedRoomTypes.length > 0 && (
                <Badge className="ml-2 bg-primary">{selectedRoomTypes.length}</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-2 pb-4 space-y-3">
              {roomTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`room-${type.id}`} 
                    checked={selectedRoomTypes.includes(type.id)}
                    onCheckedChange={() => handleRoomTypeChange(type.id)}
                    className="data-[state=checked]:bg-primary"
                  />
                  <Label 
                    htmlFor={`room-${type.id}`} 
                    className="flex items-center text-sm font-medium cursor-pointer text-gray-700 dark:text-gray-300 hover:text-primary"
                  >
                    {type.icon}
                    <span className="ml-2">{type.label}</span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="amenities" className="border-b-0">
          <AccordionTrigger className="py-3 text-base font-medium hover:no-underline">
            <div className="flex items-center">
              <Wifi className="mr-2 h-5 w-5 text-primary" />
              <span>Amenities</span>
              {selectedAmenities.length > 0 && (
                <Badge className="ml-2 bg-primary">{selectedAmenities.length}</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-2 pb-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {amenities.map((amenity) => (
                  <Badge 
                    key={amenity.id}
                    variant={selectedAmenities.includes(amenity.id) ? "default" : "outline"}
                    className={`cursor-pointer flex items-center gap-1 ${
                      selectedAmenities.includes(amenity.id) 
                        ? 'bg-primary' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => handleAmenityChange(amenity.id)}
                  >
                    {amenity.icon}
                    {amenity.label}
                  </Badge>
                ))}
              </div>
              
              <div className="space-y-2 mt-3">
                {amenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`amenity-${amenity.id}`} 
                      checked={selectedAmenities.includes(amenity.id)}
                      onCheckedChange={() => handleAmenityChange(amenity.id)}
                      className="data-[state=checked]:bg-primary"
                    />
                    <Label 
                      htmlFor={`amenity-${amenity.id}`} 
                      className="flex items-center text-sm font-medium cursor-pointer text-gray-700 dark:text-gray-300 hover:text-primary"
                    >
                      {amenity.icon}
                      <span className="ml-2">{amenity.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="gender" className="border-b-0">
          <AccordionTrigger className="py-3 text-base font-medium hover:no-underline">
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              <span>Gender Preference</span>
              {selectedGender && (
                <Badge className="ml-2 bg-primary capitalize">{selectedGender}</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-2 pb-4">
              <RadioGroup value={selectedGender} onValueChange={setSelectedGender} className="space-y-2">
                <div className="flex justify-between space-x-2">
                  <Badge 
                    variant={selectedGender === "male" ? "default" : "outline"}
                    className={`w-full py-2 justify-center cursor-pointer ${
                      selectedGender === "male" ? 'bg-blue-500' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedGender("male")}
                  >
                    <Users className="mr-1 h-4 w-4" /> Male
                  </Badge>
                  
                  <Badge 
                    variant={selectedGender === "female" ? "default" : "outline"}
                    className={`w-full py-2 justify-center cursor-pointer ${
                      selectedGender === "female" ? 'bg-pink-500' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedGender("female")}
                  >
                    <Users className="mr-1 h-4 w-4" /> Female
                  </Badge>
                  
                  <Badge 
                    variant={selectedGender === "unisex" ? "default" : "outline"}
                    className={`w-full py-2 justify-center cursor-pointer ${
                      selectedGender === "unisex" ? 'bg-purple-500' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedGender("unisex")}
                  >
                    <Users className="mr-1 h-4 w-4" /> Unisex
                  </Badge>
                </div>
                
                {selectedGender && (
                  <div className="mt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-0 h-auto text-xs"
                      onClick={() => setSelectedGender("")}
                    >
                      <Trash className="h-3 w-3 mr-1" /> Clear selection
                    </Button>
                  </div>
                )}
              </RadioGroup>
            </div>
          </AccordionContent>
        </AccordionItem>
        
      </Accordion>
      
      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={resetFilters}>
          Reset
        </Button>
        <Button size="sm" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default PropertyFilters;
