import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const CTASection = () => {
  return (
    <section className="gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center">
          <h2 className="text-3xl font-poppins font-bold text-white mb-6">
            Ready to Find Your Perfect PG?
          </h2>
          <p className="text-indigo-100 text-lg max-w-3xl mx-auto mb-8">
            Join thousands of satisfied users who found their ideal PG accommodation through StayEase. Start your search today!
          </p>
          <div className="space-x-4">
            <Link href="/properties">
              <a>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-gray-50"
                >
                  Search Properties
                </Button>
              </a>
            </Link>
            <Link href="/list-property">
              <a>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-primary/80"
                >
                  List Your Property
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
