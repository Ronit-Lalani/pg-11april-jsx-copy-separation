import React, { useState } from "react";
import { useLocation } from "wouter";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HeroSection = () => {
  const [location, setLocation] = useState("");
  const [roomType, setRoomType] = useState("any");
  const [budget, setBudget] = useState("any");
  const [, navigate] = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (roomType) params.append("roomType", roomType);
    if (budget) params.append("budget", budget);
    
    navigate(`/properties?${params.toString()}`);
  };

  const popularCities = [
    { name: "Mumbai", value: "Mumbai" },
    { name: "Bengaluru", value: "Bengaluru" },
    { name: "Delhi", value: "Delhi" },
    { name: "Pune", value: "Pune" },
    { name: "Hyderabad", value: "Hyderabad" }
  ];

  return (
    <section className="gradient-bg text-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-poppins font-bold mb-4">Find Your Perfect PG Accommodation</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-indigo-100">
            Discover comfortable, affordable PG accommodations with all the amenities you need
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-6 max-w-4xl mx-auto">
          <form className="grid gap-4 md:grid-cols-12" onSubmit={handleSearch}>
            <div className="md:col-span-5">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="search"
                  placeholder="Enter city, locality or landmark"
                  className="pl-10"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            
            <div className="md:col-span-3">
              <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Room Type
              </label>
              <Select value={roomType} onValueChange={setRoomType}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Type</SelectItem>
                  <SelectItem value="single">Single Room</SelectItem>
                  <SelectItem value="shared">Shared Room</SelectItem>
                  <SelectItem value="flat">1 BHK Flat</SelectItem>
                  <SelectItem value="studio">Studio Apartment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-3">
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Budget
              </label>
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Budget</SelectItem>
                  <SelectItem value="5000">Under ₹5,000</SelectItem>
                  <SelectItem value="10000">Under ₹10,000</SelectItem>
                  <SelectItem value="15000">Under ₹15,000</SelectItem>
                  <SelectItem value="20000">Under ₹20,000</SelectItem>
                  <SelectItem value="25000">₹20,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-1 flex items-end">
              <Button type="submit" className="w-full">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-indigo-100 mb-4">Popular cities:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {popularCities.map((city) => (
              <Button
                key={city.value}
                variant="outline"
                className="bg-indigo-700 hover:bg-indigo-600 text-white border-indigo-300 rounded-full"
                onClick={() => {
                  setLocation(city.value);
                  navigate(`/properties?location=${city.value}`);
                }}
              >
                <MapPin className="h-4 w-4 mr-2" /> {city.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
