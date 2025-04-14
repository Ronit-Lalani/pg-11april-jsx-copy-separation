import React from "react";
import { Search, CheckCircle, Coins } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Easy Search",
      description: "Find exactly what you're looking for with our powerful search filters.",
      bgColor: "bg-primary/10",
      textColor: "text-primary"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Verified Listings",
      description: "All our PG accommodations are verified for quality and accuracy.",
      bgColor: "bg-secondary/10",
      textColor: "text-secondary"
    },
    {
      icon: <Coins className="h-8 w-8" />,
      title: "No Brokerage",
      description: "Connect directly with owners and save on brokerage fees.",
      bgColor: "bg-accent/10",
      textColor: "text-accent"
    }
  ];

  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-900 dark:text-white">
            Why Choose StayEase?
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            We make finding your perfect PG accommodation simple and stress-free
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div
                className={`inline-flex items-center justify-center p-3 ${feature.bgColor} rounded-lg ${feature.textColor} mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
