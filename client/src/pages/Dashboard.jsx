import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Home, Heart, Clock, Settings, LogOut } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { getFavorites } from "@/utils/localStorage";
import { useAuth } from "@/context/AuthContext";
import PropertyCard from "@/components/properties/PropertyCard";

const Dashboard = () => {
  const [, navigate] = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    document.title = "Dashboard - StayEase";

    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const { data: bookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ['/api/bookings/user'],
    enabled: isAuthenticated
  });

  const favoriteIds = getFavorites();
  const { data: favoriteProperties, isLoading: favoritesLoading } = useQuery({
    queryKey: ['/api/properties/favorites', favoriteIds],
    enabled: favoriteIds.length > 0
  });

  const { data: recentProperties, isLoading: recentLoading } = useQuery({
    queryKey: ['/api/properties/recent'],
    enabled: isAuthenticated
  });

  if (!isAuthenticated) return null;

  const renderBookingStatus = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-3 py-1 rounded-full">Confirmed</span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs px-3 py-1 rounded-full">Pending</span>;
      case 'cancelled':
        return <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs px-3 py-1 rounded-full">Cancelled</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 text-xs px-3 py-1 rounded-full">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <div className="bg-primary/10 text-primary p-2 rounded-full mr-2">
                    {user?.firstName?.charAt(0) || user?.username?.charAt(0) || ''}
                    {user?.lastName?.charAt(0) || ''}
                  </div>
                  <span>
                    {user?.firstName || user?.username || 'User'} {user?.lastName || ''}
                  </span>
                </CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/properties")}>
                    <Clock className="mr-2 h-4 w-4" />
                    Browse Properties
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                  <Separator />
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>

            <Tabs defaultValue="bookings">
              <TabsList className="mb-4">
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
              </TabsList>

              {/* Bookings Tab */}
              <TabsContent value="bookings">
                {bookingsLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : bookings && bookings.length > 0 ? (
                  <div className="grid gap-4">
                    {bookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                Booking #{booking.id}
                              </h3>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {renderBookingStatus(booking.status)}
                                <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 text-xs px-3 py-1 rounded-full">
                                  Property #{booking.propertyId}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                <p>Check-in: {formatDate(booking.checkInDate.toString())}</p>
                                {booking.checkOutDate && <p>Check-out: {formatDate(booking.checkOutDate.toString())}</p>}
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Button variant="outline" size="sm">View Details</Button>
                              {booking.status.toLowerCase() === 'pending' && (
                                <Button variant="destructive" size="sm">Cancel</Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Bookings Yet</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        You haven't made any bookings yet. Start browsing properties to find your perfect PG accommodation.
                      </p>
                      <Button onClick={() => navigate("/properties")}>Browse Properties</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Favorites Tab */}
              <TabsContent value="favorites">
                {favoritesLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : favoriteProperties && favoriteProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoriteProperties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Heart className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Favorites Yet</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        You haven't added any properties to your favorites yet. Click the heart icon on any property to save it here.
                      </p>
                      <Button onClick={() => navigate("/properties")}>Browse Properties</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Recently Viewed Tab */}
              <TabsContent value="recent">
                {recentLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : recentProperties && recentProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recentProperties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Clock className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        No Recently Viewed Properties
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Start browsing properties to see your recent views here.
                      </p>
                      <Button onClick={() => navigate("/properties")}>Browse Properties</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
