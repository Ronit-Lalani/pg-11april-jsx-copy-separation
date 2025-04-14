import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import PropertyListingSection from "@/components/home/PropertyListingSection";
import PropertyDetailSection from "@/components/home/PropertyDetailSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import CTASection from "@/components/home/CTASection";
import AuthSection from "@/components/auth/AuthSection";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Set page title
    document.title = "StayEase - Find Your Perfect PG Accommodation";
  }, []);

  return (
    <>
      <HeroSection />
      <FeatureSection />
      <PropertyListingSection />
      <PropertyDetailSection />
      <TestimonialSection />
      {!isAuthenticated && <AuthSection />}
      <CTASection />
    </>
  );
};

export default Home;
