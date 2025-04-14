import { useState, useEffect } from "react"
import { useParams, useLocation } from "wouter"
import { useQuery } from "@tanstack/react-query"
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Calendar,
  Wifi,
  Snowflake,
  Utensils,
  Shirt,
  Shield,
  Car,
  Building,
  Phone,
  Mail,
  Star,
  Info,
  Users,
  Bed,
  Home,
  DoorOpen,
  Check,
  Clock,
  Share2,
  CircleDollarSign
} from "lucide-react"
import PaymentModal from "@/components/booking/PaymentModal"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  toggleFavorite,
  isFavorite,
  saveRecentlyViewed
} from "@/utils/localStorage"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

const PropertyDetail = () => {
  const { id } = useParams()
  const navigate = useLocation()[1]
  const { isAuthenticated, user } = useAuth()
  const { toast } = useToast()

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)

  const { data: property, isLoading, error } = useQuery({
    queryKey: [`/api/properties/${id}`],

    // Proper type for TanStack Query v5
    onSuccess: data => {
      if (data) {
        setIsFavorited(isFavorite(data.id.toString()))
        saveRecentlyViewed(data.id.toString())
      }
    }
  }) // Type assertion to handle TanStack Query type issues

  useEffect(() => {
    if (property) {
      document.title = `${property.title} - StayEase`
    } else {
      document.title = "Property Details - StayEase"
    }
  }, [property])

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to book this property",
        variant: "destructive"
      })
      navigate("/login")
      return
    }

    // Calculate total booking price (monthly rent + security deposit)
    const totalPrice = property.price + property.price / 2
    setBookingPrice(totalPrice)
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = async () => {
    try {
      // In a real app, this would be a mutation
      const booking = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          propertyId: id,
          userId: user?.id,
          checkInDate: new Date(),
          status: "confirmed" // Change to confirmed since payment is done
        }),
        credentials: "include"
      })

      if (booking.ok) {
        toast({
          title: "Booking successful",
          description: "Your booking has been confirmed successfully"
        })
        navigate("/dashboard")
      } else {
        throw new Error("Booking failed")
      }
    } catch (error) {
      toast({
        title: "Booking failed",
        description:
          "There was an error processing your booking. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleFavoriteToggle = () => {
    if (property) {
      const newState = toggleFavorite(property.id.toString())
      setIsFavorited(newState)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="py-10 text-center">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Property Not Found
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The property you're looking for doesn't exist or has been
                removed.
              </p>
              <Button onClick={() => navigate("/properties")}>
                Back to Properties
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const slides = [
    property.imageUrl,
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ]

  const amenities = Array.isArray(property.amenities) ? property.amenities : []
  const amenitiesWithIcons = [
    { icon: <Wifi className="h-5 w-5 text-primary mr-2" />, name: "WiFi" },
    { icon: <Snowflake className="h-5 w-5 text-primary mr-2" />, name: "AC" },
    { icon: <Utensils className="h-5 w-5 text-primary mr-2" />, name: "Food" },
    { icon: <Shirt className="h-5 w-5 text-primary mr-2" />, name: "Laundry" },
    {
      icon: <Shield className="h-5 w-5 text-primary mr-2" />,
      name: "Security"
    },
    { icon: <Car className="h-5 w-5 text-primary mr-2" />, name: "Parking" }
  ].filter(a =>
    amenities.some(amenity =>
      amenity.toLowerCase().includes(a.name.toLowerCase())
    )
  )

  // Get room type icon
  const getRoomTypeIcon = () => {
    const type = property.roomType.toLowerCase()
    if (type.includes("single"))
      return <Bed className="h-5 w-5 text-primary mr-2" />
    if (type.includes("shared"))
      return <Users className="h-5 w-5 text-primary mr-2" />
    if (type.includes("studio"))
      return <DoorOpen className="h-5 w-5 text-primary mr-2" />
    if (type.includes("flat") || type.includes("bhk"))
      return <Home className="h-5 w-5 text-primary mr-2" />
    return <Building className="h-5 w-5 text-primary mr-2" />
  }

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)
  }

  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [bookingPrice, setBookingPrice] = useState(0)

  return (
    <div className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/properties")}
            className="mb-5 group"
          >
            <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to properties
          </Button>

          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                {getRoomTypeIcon()}
                <Badge className="bg-primary text-xs font-semibold">
                  {property.roomType}
                </Badge>
                {property.gender && (
                  <Badge
                    className={
                      property.gender.toLowerCase() === "male"
                        ? "bg-blue-500"
                        : property.gender.toLowerCase() === "female"
                        ? "bg-pink-500"
                        : "bg-purple-500"
                    }
                  >
                    <Users className="h-3 w-3 mr-1" /> For {property.gender}s
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                >
                  <Check className="h-3 w-3 mr-1" /> Verified
                </Badge>
              </div>

              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                {property.title}
              </h1>

              <p className="text-gray-600 dark:text-gray-400 flex items-center mb-4">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0 text-primary" />
                <span>
                  {property.address}, {property.city}
                </span>
              </p>

              <div className="flex items-center gap-5 mb-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    4.8
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    (24 reviews)
                  </span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Available immediately</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 md:self-start">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Share2 className="h-4 w-4" /> Share
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share this property</DialogTitle>
                    <DialogDescription>
                      Share this property with your friends and family
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 py-4">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" className="w-full">
                        <Mail className="h-4 w-4 mr-2" /> Email
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Phone className="h-4 w-4 mr-2" /> Message
                      </Button>
                    </div>
                    <div className="relative">
                      <input
                        readOnly
                        value={window.location.href}
                        className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 py-2 px-3 text-sm"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-7"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href)
                          toast({
                            title: "Link copied",
                            description: "Property link copied to clipboard"
                          })
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                size="sm"
                className={`${
                  isFavorited
                    ? "text-red-500 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20"
                    : ""
                } gap-1`}
                onClick={handleFavoriteToggle}
                aria-label={
                  isFavorited ? "Remove from favorites" : "Add to favorites"
                }
              >
                <Heart
                  className={`h-4 w-4 ${isFavorited ? "fill-red-500" : ""}`}
                />
                {isFavorited ? "Saved" : "Save"}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Property Images Carousel */}
            <Card className="mb-8 overflow-hidden border-none shadow-lg">
              <div className="relative aspect-video">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      currentSlide === index
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <img
                      src={slide}
                      alt={`${property.title} Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition-colors duration-200 backdrop-blur-sm"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition-colors duration-200 backdrop-blur-sm"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/30 rounded-full px-3 py-2 backdrop-blur-sm">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${
                        currentSlide === index
                          ? "bg-white"
                          : "bg-white/40 hover:bg-white/70"
                      }`}
                      onClick={() => setCurrentSlide(index)}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Property Details */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    About this property
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {property.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Room Type
                      </span>
                      <div className="flex items-center">
                        {getRoomTypeIcon()}
                        <span className="font-medium">{property.roomType}</span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Security Deposit
                      </span>
                      <div className="flex items-center">
                        <CircleDollarSign className="h-5 w-5 text-primary mr-2" />
                        <span className="font-medium">
                          ₹{(property.price / 2).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Availability
                      </span>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-primary mr-2" />
                        <span className="font-medium">Immediate</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wifi className="h-5 w-5 text-primary" />
                    Amenities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenitiesWithIcons.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800"
                      >
                        {amenity.icon}
                        <span className="text-gray-700 dark:text-gray-300">
                          {amenity.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {property.address}, {property.city}
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-800 h-[300px] rounded-lg overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                      <div className="text-center">
                        <MapPin className="h-10 w-10 text-primary mx-auto mb-2" />
                        <p className="text-gray-500 dark:text-gray-400">
                          Interactive map would be displayed here
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Price and Booking Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg border border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-3xl font-bold text-primary">
                  ₹{property.price.toLocaleString("en-IN")}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
                    /month
                  </span>
                </CardTitle>
                <CardDescription>
                  All inclusive pricing, no hidden charges
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-800">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-green-700 dark:text-green-300">
                      This property is in high demand. Book soon to secure your
                      stay.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">What's included:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Maintenance and electricity included
                    </li>
                    {amenities.includes("WiFi") && (
                      <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        High speed WiFi
                      </li>
                    )}
                    {amenities.includes("Food") && (
                      <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Check className="h-4 w-4 text-green-500 mr-2" />3 meals
                        per day
                      </li>
                    )}
                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      24/7 security
                    </li>
                  </ul>
                </div>

                <Dialog
                  open={showBookingDialog}
                  onOpenChange={setShowBookingDialog}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full text-base" size="lg">
                      Book Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Book your stay</DialogTitle>
                      <DialogDescription>
                        Complete your booking for {property.title}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                        <div>
                          <h4 className="font-medium">{property.roomType}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {property.address}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            ₹{property.price.toLocaleString("en-IN")}/month
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">One-time charges:</h4>
                        <div className="flex justify-between text-sm">
                          <span>Security deposit (refundable)</span>
                          <span>
                            ₹{(property.price / 2).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setShowBookingDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          setShowBookingDialog(false)
                          handleBooking()
                        }}
                      >
                        Proceed to Payment
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => (window.location.href = `tel:+919876543210`)}
                  >
                    <Phone className="h-4 w-4" />
                    Contact Owner
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        property={property}
        amount={bookingPrice}
      />
    </div>
  )
}

export default PropertyDetail
