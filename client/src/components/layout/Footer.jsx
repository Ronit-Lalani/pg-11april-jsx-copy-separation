import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
      {/* Newsletter Section */}
      <div className="container px-4 pt-16 md:px-6">
        <div className="rounded-lg bg-primary/10 dark:bg-primary/5 p-6 md:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                Subscribe to Our Newsletter
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Get the latest updates on new properties and exclusive offers directly to your inbox.
              </p>
            </div>
            <div className="flex flex-col space-y-3 lg:items-end lg:justify-end">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Enter your email" className="w-full" />
                <Button className="flex items-center gap-1">
                  <Send className="h-4 w-4" /> Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container px-4 py-10 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              StayEase
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Finding your perfect PG accommodation made simple. Trusted by thousands of students and working professionals across India.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-50">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors inline-flex items-center"
                >
                  <ChevronRight className="h-3 w-3 mr-1" /> Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/properties"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors inline-flex items-center"
                >
                  <ChevronRight className="h-3 w-3 mr-1" /> Properties
                </Link>
              </li>
              <li>
                <Link 
                  href="/about"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors inline-flex items-center"
                >
                  <ChevronRight className="h-3 w-3 mr-1" /> About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors inline-flex items-center"
                >
                  <ChevronRight className="h-3 w-3 mr-1" /> Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors inline-flex items-center"
                >
                  <ChevronRight className="h-3 w-3 mr-1" /> FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-50">
              For Tenants
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/login"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors inline-flex items-center"
                >
                  <ChevronRight className="h-3 w-3 mr-1" /> Login
                </Link>
              </li>
              <li>
                <Link 
                  href="/signup"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors inline-flex items-center"
                >
                  <ChevronRight className="h-3 w-3 mr-1" /> Sign Up
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors inline-flex items-center"
                >
                  <ChevronRight className="h-3 w-3 mr-1" /> Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href="/settings"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors inline-flex items-center"
                >
                  <ChevronRight className="h-3 w-3 mr-1" /> Settings
                </Link>
              </li>
              <li>
                <a 
                  href="#"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors inline-flex items-center"
                >
                  <ChevronRight className="h-3 w-3 mr-1" /> Submit Feedback
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-50">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex">
                <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">
                  123 Innovation Park, Koramangala<br />
                  Bangalore, Karnataka 560034
                </span>
              </div>
              <div className="flex">
                <Phone className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">
                  +91 98765 43210
                </span>
              </div>
              <div className="flex">
                <Mail className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <a 
                  href="mailto:info@stayease.com"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                >
                  info@stayease.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="container px-4 py-6 md:px-6 text-center md:flex md:items-center md:justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} StayEase. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex flex-wrap justify-center gap-5 text-sm text-gray-500 dark:text-gray-400">
              <a 
                href="#"
                className="hover:text-primary dark:hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="#"
                className="hover:text-primary dark:hover:text-primary transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="#"
                className="hover:text-primary dark:hover:text-primary transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
