import { 
  users, type User, type InsertUser,
  properties, type Property, type InsertProperty,
  bookings, type Booking, type InsertBooking,
  favorites, type Favorite, type InsertFavorite,
  reviews, type Review, type InsertReview
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Property methods
  getProperty(id: number): Promise<Property | undefined>;
  getAllProperties(): Promise<Property[]>;
  getPropertiesByIds(ids: number[]): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  
  // Booking methods
  getBooking(id: number): Promise<Booking | undefined>;
  getBookingsByUserId(userId: number): Promise<Booking[]>;
  getBookingsByPropertyId(propertyId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  
  // Favorite methods
  getFavoritesByUserId(userId: number): Promise<Favorite[]>;
  createFavorite(favorite: InsertFavorite): Promise<Favorite>;
  deleteFavorite(userId: number, propertyId: number): Promise<boolean>;
  
  // Review methods
  getReviewsByPropertyId(propertyId: number): Promise<Review[]>;
  getReviewsByUserId(userId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private bookings: Map<number, Booking>;
  private favorites: Map<number, Favorite>;
  private reviews: Map<number, Review>;
  
  private userIdCounter: number;
  private propertyIdCounter: number;
  private bookingIdCounter: number;
  private favoriteIdCounter: number;
  private reviewIdCounter: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.bookings = new Map();
    this.favorites = new Map();
    this.reviews = new Map();
    
    this.userIdCounter = 1;
    this.propertyIdCounter = 1;
    this.bookingIdCounter = 1;
    this.favoriteIdCounter = 1;
    this.reviewIdCounter = 1;
    
    // Add some sample data
    this.initSampleData();
  }

  private initSampleData() {
    // Create sample properties
    const sampleProperties: InsertProperty[] = [
      {
        title: "Modern Studio Apartment",
        description: "A cozy studio apartment with modern amenities. Perfect for students and working professionals. Located in a quiet neighborhood with easy access to public transportation. The apartment includes a small kitchenette and a private bathroom.",
        address: "123 College Street",
        city: "Bangalore",
        price: 12000,
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        roomType: "Studio Apartment",
        gender: "unisex",
        amenities: ["WiFi", "AC", "Food", "Laundry"],
        ownerUserId: 1
      },
      {
        title: "Luxury PG for Women",
        description: "Premium PG accommodation exclusively for women with private rooms and attached bathrooms. Located in a safe neighborhood with 24/7 security. The facility includes a common dining area with home-cooked meals served three times a day.",
        address: "45 Park Avenue",
        city: "Pune",
        price: 15000,
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        roomType: "Single Room",
        gender: "female",
        amenities: ["WiFi", "AC", "Food", "Laundry", "Security"],
        ownerUserId: 1
      },
      {
        title: "Shared Room Near Tech Park",
        description: "Budget-friendly shared accommodation just 10 minutes walk from the major tech park. Ideal for working professionals looking for affordable housing with good connectivity. The room has two beds and is shared between two people.",
        address: "789 Tech Park Road",
        city: "Hyderabad",
        price: 8000,
        imageUrl: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        roomType: "Shared Room",
        gender: "male",
        amenities: ["WiFi", "Parking"],
        ownerUserId: 1
      },
      {
        title: "1 BHK Flat for Rent",
        description: "Fully furnished 1 BHK flat available for rent. Located in a prime residential area with amenities like swimming pool and gym in the complex. The flat has a separate bedroom, living room, kitchen, and bathroom.",
        address: "234 Central Avenue",
        city: "Mumbai",
        price: 25000,
        imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        roomType: "1 BHK Flat",
        gender: "unisex",
        amenities: ["WiFi", "AC", "Parking", "Security"],
        ownerUserId: 1
      },
      {
        title: "Student Hostel Near University",
        description: "Affordable hostel accommodation for students with all basic facilities. Located just across the street from the university campus. The hostel has shared rooms with common bathrooms and a study area on each floor.",
        address: "56 University Road",
        city: "Delhi",
        price: 9000,
        imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        roomType: "Shared Room",
        gender: "unisex",
        amenities: ["WiFi", "Food", "Laundry"],
        ownerUserId: 1
      },
      {
        title: "Executive PG for Men",
        description: "Premium PG accommodation for working men with private rooms and attached bathrooms. Located close to major corporate offices. The facility includes a gym and recreation area for residents.",
        address: "78 Business District",
        city: "Bangalore",
        price: 14000,
        imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        roomType: "Single Room",
        gender: "male",
        amenities: ["WiFi", "AC", "Food", "Laundry", "Parking"],
        ownerUserId: 1
      },
      {
        title: "Cozy Room in Family House",
        description: "Private room in a family house with homely atmosphere. The room is fully furnished with a single bed, study table, and wardrobe. Ideal for students or working professionals looking for a homely environment.",
        address: "123 Residential Lane",
        city: "Chennai",
        price: 10000,
        imageUrl: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        roomType: "Single Room",
        gender: "unisex",
        amenities: ["WiFi", "AC", "Food"],
        ownerUserId: 1
      },
      {
        title: "Modern Co-living Space",
        description: "Contemporary co-living space with private bedrooms and shared common areas. The space is designed for young professionals and digital nomads. Each resident gets a private bedroom while sharing the kitchen, living room, and bathrooms.",
        address: "89 Urban Street",
        city: "Pune",
        price: 18000,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        roomType: "Single Room",
        gender: "unisex",
        amenities: ["WiFi", "AC", "Laundry", "Parking", "Security"],
        ownerUserId: 1
      }
    ];

    // Add sample properties to storage
    sampleProperties.forEach(property => {
      this.createProperty(property);
    });

    // Create a sample user
    this.createUser({
      username: "admin",
      password: "password123",
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "User",
      phone: "1234567890"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const createdAt = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt,
      firstName: insertUser.firstName || null,
      lastName: insertUser.lastName || null,
      phone: insertUser.phone || null
    };
    this.users.set(id, user);
    return user;
  }
  
  // Property methods
  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }
  
  async getAllProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }
  
  async getPropertiesByIds(ids: number[]): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      (property) => ids.includes(property.id)
    );
  }
  
  async createProperty(property: InsertProperty): Promise<Property> {
    const id = this.propertyIdCounter++;
    const createdAt = new Date();
    const newProperty: Property = { 
      ...property, 
      id, 
      createdAt,
      gender: property.gender || null,
      amenities: Array.isArray(property.amenities) ? property.amenities : null,
      ownerUserId: property.ownerUserId || null
    };
    this.properties.set(id, newProperty);
    return newProperty;
  }
  
  // Booking methods
  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }
  
  async getBookingsByUserId(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.userId === userId
    );
  }
  
  async getBookingsByPropertyId(propertyId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.propertyId === propertyId
    );
  }
  
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = this.bookingIdCounter++;
    const createdAt = new Date();
    const newBooking: Booking = { 
      ...booking, 
      id, 
      createdAt,
      userId: booking.userId || null,
      propertyId: booking.propertyId || null,
      checkOutDate: booking.checkOutDate || null
    };
    this.bookings.set(id, newBooking);
    return newBooking;
  }
  
  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    booking.status = status;
    this.bookings.set(id, booking);
    return booking;
  }
  
  // Favorite methods
  async getFavoritesByUserId(userId: number): Promise<Favorite[]> {
    return Array.from(this.favorites.values()).filter(
      (favorite) => favorite.userId === userId
    );
  }
  
  async createFavorite(favorite: InsertFavorite): Promise<Favorite> {
    const id = this.favoriteIdCounter++;
    const createdAt = new Date();
    const newFavorite: Favorite = { 
      ...favorite, 
      id, 
      createdAt,
      userId: favorite.userId || null,
      propertyId: favorite.propertyId || null
    };
    this.favorites.set(id, newFavorite);
    return newFavorite;
  }
  
  async deleteFavorite(userId: number, propertyId: number): Promise<boolean> {
    const favorite = Array.from(this.favorites.values()).find(
      (fav) => fav.userId === userId && fav.propertyId === propertyId
    );
    
    if (!favorite) return false;
    
    this.favorites.delete(favorite.id);
    return true;
  }
  
  // Review methods
  async getReviewsByPropertyId(propertyId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.propertyId === propertyId
    );
  }
  
  async getReviewsByUserId(userId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.userId === userId
    );
  }
  
  async createReview(review: InsertReview): Promise<Review> {
    const id = this.reviewIdCounter++;
    const createdAt = new Date();
    const newReview: Review = { 
      ...review, 
      id, 
      createdAt,
      userId: review.userId || null,
      propertyId: review.propertyId || null,
      content: review.content || null
    };
    this.reviews.set(id, newReview);
    return newReview;
  }
}

export const storage = new MemStorage();
