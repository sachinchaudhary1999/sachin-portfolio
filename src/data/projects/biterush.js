// Project: BiteRush
// Images: src/assets/screens/biterush/
// First image is the cover.

export default {
  slug: "biterush",
  legacyId: "1",

  title: "BiteRush",

  tagline:
"A comprehensive, scalable food delivery ecosystem featuring 100+ platform features, 400+ API endpoints, and four interconnected applications for customers, restaurants, delivery partners, and administrators.",

  summary:
    "A full-stack food delivery platform connecting customers, restaurants and administrators through restaurant discovery, menu management, online ordering, payment processing, order tracking and operational analytics.",

overview: `BiteRush is a comprehensive, multi-role food delivery ecosystem engineered to streamline the entire food ordering and delivery lifecycle through four interconnected applications: Customer, Restaurant, Delivery Partner, and Admin. With 100+ platform features and 400+ API endpoints, the platform brings together customer engagement, restaurant operations, delivery management, payment processing, and centralized administration within a unified technology ecosystem.

The customer application provides an end-to-end food ordering experience, enabling users to discover nearby restaurants, explore cuisines, search and filter food options, browse dynamic menus, manage shopping carts, apply offers, place orders, complete online payments, manage delivery addresses, and monitor order progress. Location-based services and interactive maps enhance restaurant discovery and delivery location selection, while responsive interfaces provide an accessible experience across devices.

The restaurant management application equips restaurant owners with operational tools to manage restaurant profiles, configure menus, organize food categories and cuisines, upload and optimize food images, control item availability, manage inventory, process incoming orders, update order statuses, and monitor business performance. These capabilities help streamline restaurant operations while providing greater control over menu administration and order fulfillment.

The delivery partner application extends the ordering workflow into last-mile delivery operations, supporting the delivery management ecosystem and its integration with customer orders and restaurant fulfillment. The platform is designed to bring customer, restaurant, and delivery workflows together through coordinated order lifecycle management and real-time communication capabilities.

The administrative application provides centralized platform oversight, including user and restaurant management, operational controls, administrative access management, session security, platform monitoring, and analytics. Role-based authorization and protected administrative routes help maintain separation of responsibilities and secure access across the different operational areas.

On the engineering side, BiteRush is powered by a modular backend architecture built with Node.js, Express.js, MongoDB, and Mongoose, exposing 400+ API endpoints across its application modules. The backend incorporates JWT-based authentication, role-based access control, reusable middleware, structured service layers, database models, payment workflows, and centralized error-handling mechanisms. Stripe and Razorpay integrations support online payment processing, while Cloudinary handles centralized media storage and image optimization.

The platform also incorporates configurable location services using Leaflet, OpenStreetMap, Nominatim, and OSRM, with an extensible provider architecture designed to support Google Maps and Mapbox integrations. Performance, reliability, and operational visibility are addressed through Prometheus metrics collection, Grafana dashboards, backend health monitoring, and Grafana k6 load-testing scenarios. Deployment infrastructure includes Vercel for frontend applications, Render for backend services, and MongoDB Atlas for database hosting.

Beyond implementing application features, BiteRush represents hands-on experience in designing interconnected full-stack systems, developing extensive REST APIs, managing complex business workflows, integrating third-party services, debugging production deployments, monitoring backend performance, and progressively optimizing an application with scalability and maintainability in mind.

The project is under continuous development, with ongoing enhancements focused on delivery operations, real-time order coordination, inventory consistency, backend optimization, system reliability, and production readiness.`,

  tags: [
    "React.js",
    "JavaScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "REST APIs",
    "Tailwind CSS",
    "JWT",
    "Stripe",
    "Razorpay",
    "Cloudinary",
    "Socket.IO",
    "Leaflet",
    "OpenStreetMap",
    "Prometheus",
    "Grafana",
    "Docker",
    "k6",
    "Postman"
  ],

  github: "https://github.com/sachinchaudhary1999/BiteRush.git",

  webapp: "https://bite-rush-pearl.vercel.app/",

  status: "Feature enhancement and optimization ongoing",

  category: "Full Stack",

  duration: "Ongoing",

  deployed: "Vercel / Render",

stats: [
  {
    value: "70+",
    label: "Platform features"
  },
  {
    value: "400+",
    label: "API endpoints"
  },
  {
    value: "5",
    label: "Operational roles"
  },
  {
    value: "15+",
    label: "Integrated technologies"
  }
],
  features: [

    // CUSTOMER APPLICATION
    "Customer registration, login and JWT-based authentication",
    "Protected routes and role-based access control",
    "Restaurant discovery and restaurant listing",
    "Restaurant search and filtering",
    "Cuisine-based restaurant discovery",
    "Food menu browsing and category navigation",
    "Food details and product information",
    "Shopping cart management",
    "Cart item quantity management",
    "Order placement and order management",
    "Order history and order details",
    "Order status tracking",
    "Online payment integration",
    "Stripe and Razorpay payment gateways",
    "Address and delivery location management",
    "Map-based location selection",
    "Restaurant ratings and reviews",
    "Favorites and wishlist management",
    "Offers, promotions and coupon functionality",
    "Responsive customer interface",

    // RESTAURANT MANAGEMENT
    "Restaurant owner authentication",
    "Restaurant dashboard",
    "Restaurant profile management",
    "Restaurant information and configuration",
    "Food item creation and management",
    "Food category and cuisine management",
    "Menu management",
    "Food image uploads",
    "Restaurant availability management",
    "Food availability controls",
    "Inventory management",
    "Incoming order management",
    "Order status management",
    "Restaurant operational controls",
    "Restaurant performance and sales analytics",

    // ADMINISTRATION
    "Admin authentication and protected dashboard",
    "Role-based administrative authorization",
    "Superadmin account management and recovery",
    "Session management and session revocation",
    "Administrative access controls",
    "Restaurant management",
    "Customer management",
    "Food and menu management",
    "Platform operational management",
    "Administrative analytics and reporting",

    // BACKEND AND API ARCHITECTURE
    "Modular Node.js and Express backend",
    "RESTful API development",
    "MongoDB database integration",
    "Mongoose schema and model design",
    "Centralized API request handling",
    "Authentication and authorization middleware",
    "Input validation and error handling",
    "Reusable backend services",
    "User, restaurant, food, cart and order modules",
    "Order lifecycle management",
    "Payment processing and verification",
    "Protected administrative endpoints",
    "Database indexing and query optimization",

    // LOCATION AND MAP SERVICES
    "Interactive maps using Leaflet",
    "OpenStreetMap integration",
    "Address geocoding and reverse geocoding",
    "Location-based restaurant discovery",
    "Map-based delivery location selection",
    "Configurable geocoding and routing providers",
    "Nominatim geocoding integration",
    "OSRM routing integration",
    "Google Maps and Mapbox provider support",
    "Configurable provider fallback architecture",
    "Centralized map service abstraction",

    // MEDIA MANAGEMENT
    "Cloudinary image upload integration",
    "Centralized Cloudinary service",
    "Image optimization and transformation",
    "Automatic image format optimization",
    "Responsive image delivery",
    "Media management for restaurant and food images",

    // REAL-TIME AND COMMUNICATION
    "Real-time order update capabilities",
    "Socket.IO and WebSocket integration",
    "Event-driven frontend updates",

    // MONITORING AND PERFORMANCE
    "Prometheus backend metrics collection",
    "Grafana monitoring dashboards",
    "HTTP request metrics",
    "API response-time monitoring",
    "Backend health monitoring",
    "k6 performance and load testing",
    "Configurable virtual users and load scenarios",
    "Customer journey performance testing",
    "API reliability and error-rate analysis",

    // DEPLOYMENT AND DEVELOPMENT
    "Frontend deployment using Vercel",
    "Backend deployment using Render",
    "MongoDB Atlas database hosting",
    "Environment-based configuration",
    "Git and GitHub version control",
    "Postman API testing",
    "Production environment debugging",
    "Frontend and backend deployment management"
  ],

  architecture: [
    {
      layer: "Customer Frontend",
      tech: "React.js + Tailwind CSS"
    },
    {
      layer: "Restaurant Dashboard",
      tech: "React.js + Tailwind CSS"
    },
    {
      layer: "Admin Dashboard",
      tech: "React.js + Tailwind CSS"
    },
    {
      layer: "Backend",
      tech: "Node.js + Express.js"
    },
    {
      layer: "API Architecture",
      tech: "REST APIs + Modular Services"
    },
    {
      layer: "Authentication",
      tech: "JWT + Protected Routes + Role-Based Authorization"
    },
    {
      layer: "Database",
      tech: "MongoDB + Mongoose"
    },
    {
      layer: "Payments",
      tech: "Stripe + Razorpay"
    },
    {
      layer: "Media Storage",
      tech: "Cloudinary"
    },
    {
      layer: "Maps and Location",
      tech: "Leaflet + OpenStreetMap + Nominatim + OSRM"
    },
    {
      layer: "Real-Time Communication",
      tech: "Socket.IO + WebSockets"
    },
    {
      layer: "Monitoring",
      tech: "Prometheus + Grafana"
    },
    {
      layer: "Performance Testing",
      tech: "Grafana k6"
    },
    {
      layer: "Frontend Deployment",
      tech: "Vercel"
    },
    {
      layer: "Backend Deployment",
      tech: "Render"
    },
    {
      layer: "Database Hosting",
      tech: "MongoDB Atlas"
    }
  ],

  achievements: [
    "Developed a full-stack food delivery platform with multiple operational roles.",
    "Designed and implemented 60+ REST API endpoints.",
    "Built modular backend services and MongoDB data models.",
    "Integrated Stripe and Razorpay payment workflows.",
    "Implemented configurable map providers with fallback support.",
    "Established centralized image management using Cloudinary.",
    "Implemented application monitoring using Prometheus and Grafana.",
    "Created configurable k6 load-testing scenarios.",
    "Achieved 0% request failures in an initial 233-request baseline test.",
    "Achieved a 19.40 ms p95 response time in the initial baseline test."
  ],

  learned: [
    "Full-stack application architecture and development",
    "REST API design and backend service organization",
    "MongoDB schema design and database optimization",
    "JWT authentication, authorization and session security",
    "Payment gateway integration and transaction workflows",
    "Restaurant, menu, inventory and order lifecycle management",
    "Location-based services and geospatial concepts",
    "Cloud-based media storage and image optimization",
    "Real-time communication and event-driven architecture",
    "Production deployment and environment configuration",
    "Application monitoring and performance analysis",
    "Load testing and backend performance optimization"
  ],

  next: [
    "Complete delivery partner application and workflow",
    "Advanced real-time order tracking",
    "Robust inventory reservation and stock synchronization",
    "Redis caching and performance optimization",
    "Advanced restaurant and platform analytics",
    "Improved order assignment and delivery management",
    "Automated database backup and recovery",
    "Docker-based deployment and container orchestration",
    "Advanced security and production scalability improvements"
  ],

  order: 1,

  featured: true
};