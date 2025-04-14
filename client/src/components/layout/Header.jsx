import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  X,
  Home,
  Building,
  User,
  Settings,
  LogOut,
  MoonStar,
  Sun,
  Info,
  HelpCircle,
  Mail,
} from "lucide-react";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const [, navigate] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [location] = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    return location === path;
  };
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  const menuItems = [
    { label: "Home", path: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    { label: "Properties", path: "/properties", icon: <Building className="h-4 w-4 mr-2" /> },
    { label: "About Us", path: "/about", icon: <Info className="h-4 w-4 mr-2" /> },
    { label: "Contact", path: "/contact", icon: <Mail className="h-4 w-4 mr-2" /> },
    { label: "FAQ", path: "/faq", icon: <HelpCircle className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 w-full border-b ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md dark:bg-gray-900/80 border-gray-200 dark:border-gray-800" 
          : "bg-white dark:bg-gray-900 border-transparent"
      } transition-all duration-200`}
    >
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <div className="flex flex-1 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2"
          >
            <span className="font-bold text-xl md:text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              StayEase
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path) 
                    ? "text-primary" 
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <MoonStar className="h-5 w-5" />
              )}
            </Button>
            
            {/* User Actions */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative rounded-full h-8 w-8 border border-gray-200 dark:border-gray-800"
                    aria-label="User menu"
                  >
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
                <Button 
                  size="sm"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </div>
            )}
            
            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader className="border-b pb-4 mb-4">
                    <SheetTitle className="text-left">Menu</SheetTitle>
                  </SheetHeader>
                  
                  <nav className="flex flex-col space-y-4">
                    {menuItems.map((item) => (
                      <SheetClose key={item.path} asChild>
                        <Link 
                          href={item.path}
                          className={`flex items-center py-2 px-3 rounded-md ${
                            isActive(item.path) 
                              ? "bg-primary/10 text-primary" 
                              : "hover:bg-muted"
                          }`}
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                    
                    <Separator className="my-2" />
                    
                    {isAuthenticated ? (
                      <>
                        <SheetClose asChild>
                          <Link 
                            href="/dashboard"
                            className="flex items-center py-2 px-3 rounded-md hover:bg-muted"
                          >
                            <User className="h-4 w-4 mr-2" />
                            Dashboard
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link 
                            href="/settings"
                            className="flex items-center py-2 px-3 rounded-md hover:bg-muted"
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                          </Link>
                        </SheetClose>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start" 
                          onClick={handleLogout}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        <SheetClose asChild>
                          <Button 
                            variant="outline" 
                            className="w-full justify-center"
                            onClick={() => navigate("/login")}
                          >
                            Log In
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button
                            className="w-full justify-center"
                            onClick={() => navigate("/signup")}
                          >
                            Sign Up
                          </Button>
                        </SheetClose>
                      </div>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
