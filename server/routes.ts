import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserSchema, insertPropertySchema, insertBookingSchema, insertFavoriteSchema, insertReviewSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // ===== Auth Routes =====
  
  // Login route
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      
      const user = await storage.getUserByEmail(email);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // In a real app, we would check the password hash
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Set user in session
      if (req.session) {
        req.session.userId = user.id;
      }
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Signup route
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if email already exists
      const existingUserByEmail = await storage.getUserByEmail(userData.email);
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email already in use" });
      }
      
      // Check if username already exists
      const existingUserByUsername = await storage.getUserByUsername(userData.username);
      if (existingUserByUsername) {
        return res.status(400).json({ message: "Username already in use" });
      }
      
      // Create user
      const newUser = await storage.createUser(userData);
      
      // Set user in session
      if (req.session) {
        req.session.userId = newUser.id;
      }
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = newUser;
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Signup error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Logout route
  app.post("/api/auth/logout", (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          return res.status(500).json({ message: "Failed to logout" });
        }
        res.clearCookie("connect.sid");
        return res.status(200).json({ message: "Logged out successfully" });
      });
    } else {
      return res.status(200).json({ message: "Logged out successfully" });
    }
  });
  
  // Get current user
  app.get("/api/user/me", async (req, res) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const user = await storage.getUser(req.session.userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Get user error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // ===== Property Routes =====
  
  // Get all properties with optional filters
  app.get("/api/properties", async (req, res) => {
    try {
      const properties = await storage.getAllProperties();
      return res.status(200).json(properties);
    } catch (error) {
      console.error("Get properties error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get featured property
  app.get("/api/properties/featured", async (req, res) => {
    try {
      const properties = await storage.getAllProperties();
      if (!properties || properties.length === 0) {
        return res.status(404).json({ message: "No featured property found" });
      }
      
      // Mark a property as featured (in a real app, you'd have a featured flag)
      // For demo, we'll choose a property with good amenities
      const featuredProperty = properties.find(p => 
        p.amenities && p.amenities.length > 2
      ) || properties[0];
      
      return res.status(200).json(featuredProperty);
    } catch (error) {
      console.error("Get featured property error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get favorite properties
  app.get("/api/properties/favorites", async (req, res) => {
    try {
      const favoriteIds = req.query.ids ? (req.query.ids as string).split(',').map(id => parseInt(id)) : [];
      
      if (favoriteIds.length === 0) {
        return res.status(200).json([]);
      }
      
      const properties = await storage.getPropertiesByIds(favoriteIds);
      return res.status(200).json(properties);
    } catch (error) {
      console.error("Get favorite properties error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get recent properties
  app.get("/api/properties/recent", async (req, res) => {
    try {
      // In a real app, we would track recently viewed properties
      // For demo, just return some properties
      const properties = await storage.getAllProperties();
      const recentProperties = properties.slice(0, 4);
      return res.status(200).json(recentProperties);
    } catch (error) {
      console.error("Get recent properties error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get property by ID
  app.get("/api/properties/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const property = await storage.getProperty(parseInt(id));
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      return res.status(200).json(property);
    } catch (error) {
      console.error("Get property error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // ===== Booking Routes =====
  
  // Get user bookings
  app.get("/api/bookings/user", async (req, res) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const bookings = await storage.getBookingsByUserId(req.session.userId);
      return res.status(200).json(bookings);
    } catch (error) {
      console.error("Get user bookings error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Create booking
  app.post("/api/bookings", async (req, res) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const bookingData = insertBookingSchema.parse({
        ...req.body,
        userId: req.session.userId
      });
      
      const booking = await storage.createBooking(bookingData);
      return res.status(201).json(booking);
    } catch (error) {
      console.error("Create booking error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // ===== Review Routes =====
  
  // Get property reviews
  app.get("/api/properties/:id/reviews", async (req, res) => {
    try {
      const { id } = req.params;
      const reviews = await storage.getReviewsByPropertyId(parseInt(id));
      return res.status(200).json(reviews);
    } catch (error) {
      console.error("Get property reviews error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Create review
  app.post("/api/reviews", async (req, res) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const reviewData = insertReviewSchema.parse({
        ...req.body,
        userId: req.session.userId
      });
      
      const review = await storage.createReview(reviewData);
      return res.status(201).json(review);
    } catch (error) {
      console.error("Create review error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
