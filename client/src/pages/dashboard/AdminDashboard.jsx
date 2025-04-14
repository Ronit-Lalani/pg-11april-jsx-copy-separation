import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import {
  LayoutDashboard,
  Home,
  Users,
  Building,
  Calendar,
  Settings,
  Trash2,
  Edit,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  Download,
  CircleDollarSign
} from "lucide-react"
import PageTransition from "@/components/ui/page-transition"

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample data for charts
  const propertyData = [
    { name: "Jan", properties: 4 },
    { name: "Feb", properties: 6 },
    { name: "Mar", properties: 8 },
    { name: "Apr", properties: 10 },
    { name: "May", properties: 12 },
    { name: "Jun", properties: 9 }
  ]

  const bookingData = [
    { name: "Jan", bookings: 12 },
    { name: "Feb", bookings: 19 },
    { name: "Mar", bookings: 25 },
    { name: "Apr", bookings: 32 },
    { name: "May", bookings: 38 },
    { name: "Jun", bookings: 42 }
  ]

  const revenueData = [
    { name: "Jan", revenue: 45000 },
    { name: "Feb", revenue: 52000 },
    { name: "Mar", revenue: 61000 },
    { name: "Apr", revenue: 58000 },
    { name: "May", revenue: 72000 },
    { name: "Jun", revenue: 78000 }
  ]

  const pieData = [
    { name: "1 BHK", value: 35 },
    { name: "2 BHK", value: 25 },
    { name: "3 BHK", value: 15 },
    { name: "Studio", value: 25 }
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  // Mock API calls with useQuery
  const { data: properties, isLoading: propertiesLoading } = useQuery({
    queryKey: ["/api/properties"]
  })

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["/api/users"],
    enabled: activeTab === "users"
  })

  const { data: bookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ["/api/bookings"],
    enabled: activeTab === "bookings"
  })

  // Calculate total revenue
  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.revenue, 0)
  const totalUsers = 154 // Mock data
  const totalProperties = properties?.length || 0
  const totalBookings = bookings?.length || 0

  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
          Admin Dashboard
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
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Properties</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₹{totalRevenue.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-green-500 flex items-center">
                      <ArrowUpRight className="h-3 w-3" /> 12%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {totalUsers}
                    </span>
                    <span className="text-sm text-green-500 flex items-center">
                      <ArrowUpRight className="h-3 w-3" /> 8%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Properties Listed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {totalProperties}
                    </span>
                    <span className="text-sm text-green-500 flex items-center">
                      <ArrowUpRight className="h-3 w-3" /> 15%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Active Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {totalBookings}
                    </span>
                    <span className="text-sm text-green-500 flex items-center">
                      <ArrowUpRight className="h-3 w-3" /> 24%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>
                    Monthly revenue for the current year
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={revenueData}
                      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={value => [`₹${value}`, "Revenue"]} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" /> Export Data
                  </Button>
                  <Button size="sm" className="gap-1">
                    <CircleDollarSign className="h-4 w-4" /> View Details
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Property Analytics</CardTitle>
                  <CardDescription>
                    Property distribution by type
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={value => [`${value}%`, "Percentage"]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest updates and actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(item => (
                    <div
                      key={item}
                      className="flex items-start gap-4 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item % 3 === 0
                            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                            : item % 3 === 1
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                            : "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300"
                        }`}
                      >
                        {item % 3 === 0 ? (
                          <Home className="h-5 w-5" />
                        ) : item % 3 === 1 ? (
                          <Users className="h-5 w-5" />
                        ) : (
                          <Calendar className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {item % 3 === 0
                            ? "New property added"
                            : item % 3 === 1
                            ? "New user registered"
                            : "Booking confirmed"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item % 3 === 0
                            ? "Modern Studio Apartment in Koramangala"
                            : item % 3 === 1
                            ? "Rani Sharma joined as a tenant"
                            : "Booking #1234 was confirmed"}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {item} hour{item > 1 ? "s" : ""} ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full gap-1">
                  View All Activities
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold">Manage Properties</h2>
              <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search properties..." className="pl-8" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    Add Property
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                      ID
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                      Property
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                      Price
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!propertiesLoading && properties ? (
                    properties.map(property => (
                      <tr
                        key={property.id}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                          #{property.id}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden">
                              <img
                                src={property.imageUrl}
                                alt={property.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                {property.title}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {property.address}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                          {property.roomType}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                          ₹{property.price.toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                              property.id % 3 === 0
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : property.id % 3 === 1
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            }
                          >
                            {property.id % 3 === 0
                              ? "Available"
                              : property.id % 3 === 1
                              ? "Pending"
                              : "Booked"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-8 text-center text-gray-500 dark:text-gray-400"
                      >
                        {propertiesLoading
                          ? "Loading properties..."
                          : "No properties found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-medium">1-10</span> of{" "}
                <span className="font-medium">{properties?.length || 0}</span>{" "}
                properties
              </p>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold">Manage Users</h2>
              <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search users..." className="pl-8" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    Add User
                  </Button>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                          ID
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                          User
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                          Email
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                          Role
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {!usersLoading ? (
                        Array.from({ length: 8 }).map((_, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          >
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                              #{index + 1}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                  {
                                    [
                                      "JS",
                                      "RS",
                                      "AK",
                                      "PL",
                                      "VK",
                                      "MT",
                                      "SG",
                                      "NP"
                                    ][index % 8]
                                  }
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-gray-100">
                                    {
                                      [
                                        "John Smith",
                                        "Rani Sharma",
                                        "Amit Kumar",
                                        "Pooja Lal",
                                        "Vijay Kumar",
                                        "Mary Thomas",
                                        "Suresh Gupta",
                                        "Nina Patel"
                                      ][index % 8]
                                    }
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Joined{" "}
                                    {
                                      [
                                        "Jan",
                                        "Feb",
                                        "Mar",
                                        "Apr",
                                        "May",
                                        "Jun",
                                        "Jul",
                                        "Aug"
                                      ][index % 8]
                                    }{" "}
                                    2023
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                              {
                                [
                                  "john",
                                  "rani",
                                  "amit",
                                  "pooja",
                                  "vijay",
                                  "mary",
                                  "suresh",
                                  "nina"
                                ][index % 8]
                              }
                              @example.com
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                              {index % 3 === 0
                                ? "Tenant"
                                : index % 3 === 1
                                ? "Owner"
                                : "Admin"}
                            </td>
                            <td className="py-3 px-4">
                              <Badge
                                className={
                                  index % 2 === 0
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                }
                              >
                                {index % 2 === 0 ? "Active" : "Inactive"}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={6}
                            className="py-8 text-center text-gray-500 dark:text-gray-400"
                          >
                            Loading users...
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between py-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing <span className="font-medium">1-8</span> of{" "}
                  <span className="font-medium">48</span> users
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

          <TabsContent value="bookings" className="space-y-6">
            <h2 className="text-2xl font-bold">Manage Bookings</h2>
            <div className="flex flex-col gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={bookingData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="bookings" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                          <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                            ID
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                            Property
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                            Tenant
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
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          >
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                              #{index + 1001}
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-300 max-w-xs truncate">
                              Modern Studio Apartment in Koramangala
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                              {
                                [
                                  "John Smith",
                                  "Rani Sharma",
                                  "Amit Kumar",
                                  "Pooja Lal",
                                  "Vijay Kumar"
                                ][index]
                              }
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                              {
                                [
                                  "Jun 1",
                                  "May 28",
                                  "May 26",
                                  "May 23",
                                  "May 20"
                                ][index]
                              }
                              , 2023
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                              ₹
                              {[15000, 18000, 12000, 20000, 16000][
                                index
                              ].toLocaleString("en-IN")}
                            </td>
                            <td className="py-3 px-4">
                              <Badge
                                className={
                                  index % 4 === 0
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                    : index % 4 === 1
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                    : index % 4 === 2
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                }
                              >
                                {index % 4 === 0
                                  ? "Confirmed"
                                  : index % 4 === 1
                                  ? "Processing"
                                  : index % 4 === 2
                                  ? "Pending"
                                  : "Cancelled"}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between py-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showing <span className="font-medium">1-5</span> of{" "}
                    <span className="font-medium">42</span> bookings
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
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Admin Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your administrator profile
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Admin User" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="admin@pgfinder.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="Administrator" disabled />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your password and security options
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Update Password</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Control what notifications you receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications via email
                        </p>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="toggle toggle-primary"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Bookings</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get notified for new property bookings
                        </p>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="toggle toggle-primary"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">User Registrations</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get notified when new users register
                        </p>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          className="toggle toggle-primary"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Preferences</Button>
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

export default AdminDashboard
