import BiteRush from './assets/work_logo/BiteRush.png';
import TravelNest from './assets/work_logo/TravelNest.png';
import PortfolioImage from './assets/work_logo/Portfolio.png';

// Detailed content used exclusively by the Project Details page.
export const projectDetails = {
  1: {
    category: "Full Stack",
    duration: "Ongoing",
    deployed: "Vercel",
    overview: 
    " BiteRush is a full-stack food delivery application that brings customers,restaurant owners, and administrators into one connected ordering experience.,Customers can discover food, manage their cart, place orders, and follow order progress, while restaurant and admin tools help manage products, inventory, and operations.  ",



    features: [
      
      "JWT Authentication & Protected Routes",
       "Restaurant and Menu Management", 
       "Cart & Order Management", 
       "Admin Analytics Dashboard",
        "Payment Integration (Stripe/Razorpay)", 
        "Inventory & Availability Controls", 
        "Order Tracking",
         "Responsive Customer Experience",
          "JWT Authentication & Protected Routes",
       "Restaurant and Menu Management", 
       "Cart & Order Management", 
       "Admin Analytics Dashboard",
        "Payment Integration (Stripe/Razorpay)", 
        "Inventory & Availability Controls", 
        "Order Tracking",
         "Responsive Customer Experience"
        
        ],


    learning: ["Designed RESTful APIs and protected routes", "Built cart and order lifecycle workflows", "Structured role-based dashboards", "Worked with payment and inventory flows"],
    improvements: ["Real-time order updates with Socket.IO", "More robust inventory reservation", "Delivery partner workflow", "Advanced sales and restaurant analytics"],
    architecture: ["React + Tailwind CSS", "Node.js + Express", "MongoDB", "Cloudinary", "JWT + Payments"],
    gallery: [BiteRush],
  },
  2: {
    category: "Full Stack",
    duration: "3+ Months",
    deployed: "Vercel (Frontend) · Render (Backend)",
    overview: "TravelNest is a full-stack vacation rental platform where guests can explore properties, check availability, and manage bookings. Hosts can publish and manage listings, while the admin panel provides platform-wide control over users, properties, bookings, and activity.",
    features: ["User Authentication (JWT)", "Property Listings & Search", "Booking & Availability Management", "Wishlist & Reviews", "Real-time Messaging", "Fully Functional Admin Panel", "Image Uploads (Cloudinary)", "Responsive Design"],
    learning: ["Designed scalable RESTful APIs", "Built booking and availability validation", "Implemented secure authentication and authorization", "Optimized image delivery and frontend performance"],
    improvements: ["Payment Gateway Integration", "Real-time Notifications", "Advanced Filters & Search", "Host booking analytics and calendar sync"],
    architecture: ["React + Tailwind CSS", "Node.js + Express.js", "MongoDB", "Cloudinary", "JWT + Cookies"],
    gallery: [
  {
    image: TravelNest,
    title: "Homepage",
    description: "Discover vacation destinations."
  },
  {
    image: BiteRush,
    title: "Property Listings",
    description: "Explore available vacation properties."
  },
],
  },
  3: {
    category: "Frontend",
    duration: "Ongoing",
    deployed: "Vercel",
    overview: "A personal developer portfolio built to present my projects, technical skills, experience, and education in one place. The interface focuses on responsive layouts, clear project storytelling, and a consistent visual identity.",
    features: ["Responsive Layout", "Project Showcase", "Skills & Experience Sections", "Contact Section", "Reusable React Components", "Modern Dark UI", "Smooth Navigation", "Deployed on Vercel"],
    learning: ["Built reusable component structures", "Improved responsive UI implementation", "Practiced deployment workflows", "Refined visual hierarchy and accessibility"],
    improvements: ["Dedicated project detail pages", "Content managed from a data source", "More project walkthroughs", "Performance and accessibility refinements"],
    architecture: ["React", "Tailwind CSS", "Reusable Components", "Static Assets", "Vercel"],
    gallery: [PortfolioImage],
  },
};

export const projectStats = {
  1: { features: "70+", apis: "60+", responsive: "100%" },
  2: { features: "50+", apis: "25+", responsive: "100%" },
  3: { features: "15+", apis: "01+", responsive: "100%" },
};

