import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useLocation } from "wouter"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import {
  Home,
  LayoutDashboard,
  Settings,
  Calendar,
  CreditCard,
  MessageSquare,
  Heart,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  Printer,
  Share2
} from "lucide-react"
import PageTransition from "@/components/ui/page-transition"

const TenantDashboard = () => {
  const navigate = useLocation()[1]
  const { user } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock API calls with useQuery
  const { data: bookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ["/api/bookings"],
    enabled: activeTab === "bookings" || activeTab === "overview"
  })

  const { data: favoriteProperties, isLoading: favoritesLoading } = useQuery({
    queryKey: ["/api/favorites"],
    enabled: activeTab === "favorites"
  })

  const getStatusBadge = status => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Confirmed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            Pending
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            Cancelled
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
            Processing
          </Badge>
        )
    }
  }

  const generateRentReceipt = bookingId => {
    toast({
      title: "Receipt Generated",
      description: "Your rent receipt has been generated successfully"
    })
  }

  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
          My Dashboard
        </h1>

        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 md:grid-cols-5 gap-2">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">My Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Favorites</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Welcome Card */}
            <Card className="bg-gradient-to-br from-primary/20 to-primary/5">
              <CardHeader>
                <CardTitle>Welcome back, {user?.name || "Tenant"}!</CardTitle>
                <CardDescription>
                  Here's an overview of your current accommodation and bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Current Property
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-md bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden">
                          <img
                            src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Current property"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">
                            Modern Studio Apartment
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Koramangala, Bangalore
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => navigate("/property/1")}
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Rent Due
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        ₹15,000
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Due on 5th June, 2023
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button size="sm" className="w-full">
                        Pay Now
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Lease Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          Active
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Expires on 31st Dec, 2023
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        Renewal Options
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>
                  Your latest property bookings and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map(booking => (
                    <div
                      key={booking}
                      className="flex items-start justify-between border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            booking === 1
                              ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                              : booking === 2
                              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                              : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                          }`}
                        >
                          {booking === 1 ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : booking === 2 ? (
                            <Clock className="h-5 w-5" />
                          ) : (
                            <Calendar className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {booking === 1
                              ? "Modern Studio Apartment"
                              : booking === 2
                              ? "Luxury 2BHK Apartment"
                              : "Cozy 1BHK Flat"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {booking === 1
                              ? "Confirmed on May 15, 2023"
                              : booking === 2
                              ? "Pending approval"
                              : "Booking for July 2023"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="mb-1">
                          {booking === 1 ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Confirmed
                            </Badge>
                          ) : booking === 2 ? (
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                              Pending
                            </Badge>
                          ) : (
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              Upcoming
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          ₹
                          {[15000, 22000, 18000][booking - 1].toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setActiveTab("bookings")}
                >
                  View All Bookings
                </Button>
              </CardFooter>
            </Card>

            {/* Quick Actions & Notifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col items-center gap-2"
                    >
                      <CreditCard className="h-6 w-6 text-primary" />
                      <span>Pay Rent</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col items-center gap-2"
                    >
                      <MessageSquare className="h-6 w-6 text-primary" />
                      <span>Contact Owner</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col items-center gap-2"
                    >
                      <FileText className="h-6 w-6 text-primary" />
                      <span>View Lease</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col items-center gap-2"
                    >
                      <Home className="h-6 w-6 text-primary" />
                      <span>Browse Properties</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          Rent reminder
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Your rent payment is due in 3 days
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          New message from owner
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Regarding maintenance schedule for next week
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          Yesterday
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          Rent payment successful
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Your last month's rent payment was received
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          May 05, 2023
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Bookings</h2>
              <Button size="sm">
                <Calendar className="h-4 w-4 mr-2" /> New Booking
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                          Booking ID
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                          Property
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                          Date
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                          Receipt
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {!bookingsLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          >
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                              #{1001 + index}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-md bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden">
                                  <img
                                    src={`https://images.unsplash.com/photo-${
                                      index % 2 === 0
                                        ? "1598928506311-c55ded91a20c"
                                        : "1484154218962-a197022b5858"
                                    }?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                                    alt="Property"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-gray-100">
                                    {index % 3 === 0
                                      ? "Modern Studio Apartment"
                                      : index % 3 === 1
                                      ? "Luxury 2BHK Apartment"
                                      : "Cozy 1BHK Flat"}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {index % 2 === 0
                                      ? "Koramangala, Bangalore"
                                      : "Indiranagar, Bangalore"}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                              {["Jan", "Feb", "Mar", "Apr", "May"][index]}, 2023
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                              ₹
                              {[15000, 18000, 22000, 20000, 17000][
                                index
                              ].toLocaleString("en-IN")}
                            </td>
                            <td className="py-3 px-4">
                              {getStatusBadge(
                                index % 4 === 0
                                  ? "confirmed"
                                  : index % 4 === 1
                                  ? "pending"
                                  : index % 4 === 2
                                  ? "confirmed"
                                  : "cancelled"
                              )}
                            </td>
                            <td className="py-3 px-4">
                              {index % 4 === 0 || index % 4 === 2 ? (
                                <div className="flex gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                      generateRentReceipt(1001 + index)
                                    }
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <Printer className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  N/A
                                </span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={6}
                            className="py-8 text-center text-gray-500 dark:text-gray-400"
                          >
                            Loading your bookings...
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between py-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing <span className="font-medium">1-5</span> of{" "}
                  <span className="font-medium">12</span> bookings
                </p>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Favorite Properties</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/properties")}
              >
                Browse More Properties
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {!favoritesLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative aspect-[4/3]">
                      <img
                        src={`https://images.unsplash.com/photo-${
                          index % 3 === 0
                            ? "1598928506311-c55ded91a20c"
                            : index % 3 === 1
                            ? "1484154218962-a197022b5858"
                            : "1493809842412-78e9f56c4961"
                        }?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                        alt="Property"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-white/80 text-red-500 hover:bg-white hover:text-red-600 rounded-full"
                        >
                          <Heart className="h-5 w-5 fill-current" />
                        </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4">
                        <Badge className="bg-primary mb-2">
                          {index % 3 === 0
                            ? "Studio"
                            : index % 3 === 1
                            ? "2 BHK"
                            : "1 BHK"}
                        </Badge>
                        <p className="font-bold">
                          ₹
                          {[15000, 22000, 18000, 20000, 16000, 25000][
                            index
                          ].toLocaleString("en-IN")}
                          /month
                        </p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1">
                        {index % 3 === 0
                          ? "Modern Studio Apartment"
                          : index % 3 === 1
                          ? "Luxury 2BHK Apartment"
                          : "Cozy 1BHK Flat"}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 flex items-center">
                        <Home className="h-4 w-4 mr-1 text-primary" />
                        {index % 2 === 0
                          ? "Koramangala, Bangalore"
                          : "Indiranagar, Bangalore"}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {["WiFi", "AC", "Furnished", "Parking", "24x7 Security"]
                          .slice(0, 3 + (index % 3))
                          .map((amenity, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs"
                            >
                              {amenity}
                            </Badge>
                          ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 px-4 pb-4">
                      <Button
                        className="w-full"
                        onClick={() => navigate(`/property/${index + 1}`)}
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 py-8 text-center text-gray-500 dark:text-gray-400">
                  Loading your favorite properties...
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <h2 className="text-2xl font-bold">Payment History</h2>

            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
                <CardDescription>
                  Your payment history and upcoming dues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Current Due
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        ₹15,000
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Due on 5th June, 2023
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button size="sm" className="w-full">
                        Pay Now
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Total Paid (2023)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        ₹75,000
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Jan - May 2023
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        View Statement
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Security Deposit
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        ₹30,000
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Refundable at lease end
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <h3 className="font-semibold text-lg mb-4">
                  Recent Transactions
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                          Date
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                          Description
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                          Receipt
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        "May 5, 2023",
                        "Apr 5, 2023",
                        "Mar 5, 2023",
                        "Feb 5, 2023",
                        "Jan 5, 2023"
                      ].map((date, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        >
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                            {date}
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                            Monthly Rent -{" "}
                            {["May", "Apr", "Mar", "Feb", "Jan"][index]} 2023
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                            ₹15,000
                          </td>
                          <td className="py-3 px-4">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Paid
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => generateRentReceipt(index)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Printer className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Transactions
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          HDFC Credit Card
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          **** **** **** 4321
                        </p>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>

                  <div className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          SBI Debit Card
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          **** **** **** 8765
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Set Default
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Add Payment Method
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Account Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your account information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold mb-3">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      defaultValue={user?.name || "Jane Doe"}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      defaultValue={user?.email || "jane.doe@example.com"}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      defaultValue="+91 98765 43210"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      defaultValue="1995-01-15"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Save Changes</Button>
                </CardFooter>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Password & Security</CardTitle>
                    <CardDescription>
                      Update your password and secure your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Update Password</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Control how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          Email Notifications
                        </p>
                        <p className="text-sm text-gray-500">
                          Receive updates via email
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="toggle toggle-primary"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          SMS Notifications
                        </p>
                        <p className="text-sm text-gray-500">
                          Receive updates via SMS
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="toggle toggle-primary"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          Payment Reminders
                        </p>
                        <p className="text-sm text-gray-500">
                          Get notified about upcoming payments
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="toggle toggle-primary"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          Marketing Communications
                        </p>
                        <p className="text-sm text-gray-500">
                          Receive promotional offers and updates
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Save Preferences</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}

export default TenantDashboard
