import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageTransition from "@/components/ui/page-transition";
import { useLocation } from "wouter";
import {
  Users,
  Home,
  Star,
  Shield,
  Award,
  BarChart,
  Clock,
  MapPin,
  ChevronRight
} from "lucide-react";

const AboutUs = () => {
  const [, navigate] = useLocation();

  return (
    <PageTransition>
      <div className="bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Redefining <span className="text-primary">PG Living</span> Experience
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                StayEase is on a mission to transform the way people find and experience PG accommodations across India.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="gap-2"
                  onClick={() => navigate("/properties")}
                >
                  Browse Properties <ChevronRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate("/contact")}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Key Stats */}
        <div className="bg-gray-50 dark:bg-gray-800 py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">10K+</p>
                <p className="text-gray-600 dark:text-gray-400">Properties Listed</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">50+</p>
                <p className="text-gray-600 dark:text-gray-400">Cities Covered</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">25K+</p>
                <p className="text-gray-600 dark:text-gray-400">Happy Tenants</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">4.8</p>
                <p className="text-gray-600 dark:text-gray-400">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Story */}
        <div className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                The journey of transforming the PG accommodation experience in India
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Our team" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Founded with a Purpose
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  StayEase was founded in 2020 with a simple vision - to solve the challenges faced by students and working professionals in finding quality PG accommodations. Our founders experienced these struggles firsthand during their college and early career days.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  What started as a small listing platform has now grown into India's most trusted PG finder service, connecting thousands of tenants with verified property owners across the country.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Our commitment to transparency, quality, and tenant satisfaction has been the cornerstone of our growth. We've expanded from just 3 cities to over 50 urban centers, and we're just getting started.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mission & Values */}
        <div className="bg-gray-50 dark:bg-gray-800 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission & Values</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Guided by principles that prioritize quality, trust, and community
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Trust & Safety</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We verify every property and owner on our platform to ensure your safety and peace of mind.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Quality Living</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We believe everyone deserves comfortable, clean, and well-maintained living spaces.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Community</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We foster connections between tenants, creating meaningful communities within our properties.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Transparency</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We provide clear, honest information about properties, pricing, and amenities without hidden charges.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Efficiency</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our platform is designed to make the process of finding and booking PGs fast and hassle-free.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Hear from our happy tenants about their experiences with StayEase
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <Star className="h-5 w-5 text-yellow-500" />
                      <Star className="h-5 w-5 text-yellow-500" />
                      <Star className="h-5 w-5 text-yellow-500" />
                      <Star className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-bold text-gray-900 dark:text-white truncate">Simran D.</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Working Professional, Hyderabad</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    "StayEase was a game-changer for me. I found an amazing PG in a prime location, with all the amenities I needed. The process was smooth, and the support team was always there to assist when needed. Highly recommend it!"
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AboutUs;
