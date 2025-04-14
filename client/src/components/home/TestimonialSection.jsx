import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Student, Delhi University",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5,
    content: "Finding a good PG was so difficult until I discovered StayEase. The platform made it incredibly easy to search for properties that fit my budget and preferences. I found a great PG close to my college within a day!"
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "Software Engineer, Bengaluru",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.5,
    content: "As someone who moved to a new city for work, StayEase was a lifesaver. The verified listings gave me peace of mind, and the detailed filters helped me find a PG with exactly the amenities I needed. Highly recommend!"
  },
  {
    id: 3,
    name: "Sneha Patel",
    role: "Marketing Specialist, Mumbai",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    content: "The level of detail in the property listings is impressive. Virtual tours helped me narrow down my choices before physically visiting. I found a great female PG with excellent security and all the amenities I wanted."
  }
];

const TestimonialSection = () => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg 
          key="half" 
          className="w-5 h-5 text-yellow-400" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#half)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <defs>
            <linearGradient id="half" x1="0" x2="100%" y1="0" y2="0">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      );
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-yellow-400" />);
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-900 dark:text-white">
            What Our Users Say
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Read testimonials from people who found their perfect PG through StayEase
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={`${testimonial.name} avatar`} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="mb-3">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
