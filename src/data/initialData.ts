import { User, Farm, Crop, Product, Order, ForumPost, KanbanTask, SkillItem, ProjectMetadata } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-farmer-1',
    name: 'Ramesh Patel',
    email: 'ramesh@agritech.com',
    role: 'farmer',
    phone: '+91 98765 43210',
    location: 'Nashik, Maharashtra',
    language: 'en',
    token: 'jwt_mock_token_farmer_ramesh_patel_2026'
  },
  {
    id: 'user-admin-1',
    name: 'Dr. Anita Swaminathan (Agri Scientist)',
    email: 'admin@agritech.com',
    role: 'admin',
    phone: '+91 91234 56780',
    location: 'IARI New Delhi',
    language: 'en',
    token: 'jwt_mock_token_admin_dr_anita_2026'
  }
];

export const INITIAL_FARMS: Farm[] = [
  {
    id: 'farm-1',
    ownerId: 'user-farmer-1',
    farmName: 'Godavari Green Valley - Sector A',
    totalAreaAcre: 14.5,
    location: {
      district: 'Nashik',
      state: 'Maharashtra',
      latitude: 19.9975,
      longitude: 73.7898
    },
    irrigationType: 'Drip',
    createdAt: '2026-03-12T10:00:00Z'
  },
  {
    id: 'farm-2',
    ownerId: 'user-farmer-1',
    farmName: 'Malwa Organic Agro Plot',
    totalAreaAcre: 8.0,
    location: {
      district: 'Indore',
      state: 'Madhya Pradesh',
      latitude: 22.7196,
      longitude: 75.8577
    },
    irrigationType: 'Sprinkler',
    createdAt: '2026-04-05T14:30:00Z'
  }
];

export const INITIAL_CROPS: Crop[] = [
  {
    id: 'crop-1',
    farmId: 'farm-1',
    farmName: 'Godavari Green Valley - Sector A',
    farmerId: 'user-farmer-1',
    cropName: 'Basmati Paddy',
    variety: 'Pusa Basmati 1121',
    plantedDate: '2026-06-15',
    expectedHarvestDate: '2026-11-20',
    soilMetrics: {
      nitrogen_N: 115,
      phosphorus_P: 44,
      potassium_K: 58,
      pH: 6.8,
      moisturePercent: 64
    },
    status: 'Flowering',
    createdAt: '2026-06-15T08:00:00Z'
  },
  {
    id: 'crop-2',
    farmId: 'farm-1',
    farmName: 'Godavari Green Valley - Sector A',
    farmerId: 'user-farmer-1',
    cropName: 'Sharbati Wheat',
    variety: 'HD-2967 Certified',
    plantedDate: '2026-10-01',
    expectedHarvestDate: '2027-03-25',
    soilMetrics: {
      nitrogen_N: 130,
      phosphorus_P: 52,
      potassium_K: 65,
      pH: 7.1,
      moisturePercent: 54
    },
    status: 'Vegetative',
    createdAt: '2026-10-01T09:15:00Z'
  },
  {
    id: 'crop-3',
    farmId: 'farm-2',
    farmName: 'Malwa Organic Agro Plot',
    farmerId: 'user-farmer-1',
    cropName: 'Bt-Cotton Hybrid',
    variety: 'RCH-659 BG-II',
    plantedDate: '2026-05-10',
    expectedHarvestDate: '2026-12-05',
    soilMetrics: {
      nitrogen_N: 98,
      phosphorus_P: 38,
      potassium_K: 48,
      pH: 6.5,
      moisturePercent: 49
    },
    status: 'Harvest-Ready',
    createdAt: '2026-05-10T07:45:00Z'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Hybrid Wheat Seeds (HD-2967)',
    category: 'Seed',
    price: 650,
    stock: 120,
    unit: '50kg bag',
    description: 'High-yielding, rust resistant wheat seeds certified by National Seeds Corporation.',
    rating: 4.8
  },
  {
    id: 'prod-2',
    title: 'Organic N-P-K 19:19:19 Bio-Fertilizer',
    category: 'Fertilizer',
    price: 950,
    stock: 85,
    unit: '25kg bag',
    description: '100% water-soluble balanced macronutrients with rapid plant root absorption.',
    rating: 4.9
  },
  {
    id: 'prod-3',
    title: 'Pure Neem Oil Bio-Shield (10,000 PPM)',
    category: 'Pesticide',
    price: 420,
    stock: 200,
    unit: '1L Bottle',
    description: 'Cold-pressed azadirachtin organic repellent effective against aphids, thrips, and mites.',
    rating: 4.7
  },
  {
    id: 'prod-4',
    title: 'Drip Irrigation Inline Laterals (16mm)',
    category: 'Equipment',
    price: 1800,
    stock: 40,
    unit: '100m Bundle',
    description: 'UV stabilized high-durability drip line with precision pressure-compensating drippers (40cm).',
    rating: 4.9
  },
  {
    id: 'prod-5',
    title: 'Trichoderma Viride Bio-Fungicide',
    category: 'Pesticide',
    price: 320,
    stock: 150,
    unit: '1kg pack',
    description: 'Natural fungal biocontrol agent preventing root rot, damping-off, and collar rot in seedlings.',
    rating: 4.6
  },
  {
    id: 'prod-6',
    title: 'Digital Soil NPK & pH Diagnostic Probe',
    category: 'Equipment',
    price: 3499,
    stock: 25,
    unit: '1 Unit',
    description: 'Handheld instant test probe with LCD backlight for field measurements of nitrogen, phosphorus, potassium, and pH.',
    rating: 4.9
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-89421',
    farmerId: 'user-farmer-1',
    farmerName: 'Ramesh Patel',
    items: [
      { productId: 'prod-3', title: 'Pure Neem Oil Bio-Shield (10,000 PPM)', quantity: 2, price: 420 },
      { productId: 'prod-2', title: 'Organic N-P-K 19:19:19 Bio-Fertilizer', quantity: 1, price: 950 }
    ],
    totalAmount: 1790,
    deliveryAddress: 'Village Dindori, Plot #12, Near Gram Panchayat, Nashik, PIN: 422202',
    status: 'Delivered',
    createdAt: '2026-10-10T11:20:00Z'
  },
  {
    id: 'ORD-92043',
    farmerId: 'user-farmer-1',
    farmerName: 'Ramesh Patel',
    items: [
      { productId: 'prod-1', title: 'Hybrid Wheat Seeds (HD-2967)', quantity: 2, price: 650 }
    ],
    totalAmount: 1300,
    deliveryAddress: 'Village Dindori, Plot #12, Near Gram Panchayat, Nashik, PIN: 422202',
    status: 'Processing',
    createdAt: '2026-10-18T09:40:00Z'
  }
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    authorId: 'user-farmer-1',
    authorName: 'Ramesh Patel',
    title: 'Yellowing of leaf tips in basmati paddy during tillering stage',
    content: 'My basmati paddy crop (PB 1121) is 45 days old. Lower leaf tips are turning yellowish brown with faint chlorosis. Soil pH is 6.8. Could this be Zinc deficiency or Nitrogen shortfall?',
    category: 'Pest Control',
    isExpertReviewed: true,
    createdAt: '2026-10-14T15:20:00Z',
    replies: [
      {
        id: 'reply-1',
        responderId: 'user-admin-1',
        responderName: 'Dr. Anita Swaminathan (Agri Scientist)',
        role: 'admin',
        message: 'Hello Ramesh, this is classic Zinc deficiency combined with transient nitrogen leaching after high rainfall. Apply Zinc Sulphate (Chelated Zn 12%) @ 1.5g per litre of water via foliar spray in early morning. Also apply 15kg/acre top-dress Urea mixed with neem cake.',
        createdAt: '2026-10-14T17:05:00Z'
      },
      {
        id: 'reply-2',
        responderId: 'user-farmer-1',
        responderName: 'Ramesh Patel',
        role: 'farmer',
        message: 'Thank you Dr. Anita! I sprayed the chelated zinc this morning and the leaf chlorosis has halted.',
        createdAt: '2026-10-16T08:12:00Z'
      }
    ]
  },
  {
    id: 'post-2',
    authorId: 'user-farmer-1',
    authorName: 'Suresh Verma',
    title: 'Preventive measures against Fall Armyworm in Rabi Sweet Corn',
    content: 'Observing minor whorl feeding holes on maize leaves in adjacent fields. What are biological management steps before chemical intervention?',
    category: 'Pest Control',
    isExpertReviewed: true,
    createdAt: '2026-10-17T11:00:00Z',
    replies: [
      {
        id: 'reply-3',
        responderId: 'user-admin-1',
        responderName: 'Dr. Anita Swaminathan (Agri Scientist)',
        role: 'admin',
        message: 'Install pheromone traps @ 5 per acre for monitoring. Apply Neem oil 10,000 PPM (5ml/L) or Bacillus thuringiensis (Bt) kurstaki @ 2g/L directly into plant whorls. Avoid indiscriminate synthetic pyrethroids.',
        createdAt: '2026-10-17T14:30:00Z'
      }
    ]
  }
];

export const INITIAL_SKILLS: SkillItem[] = [
  { name: 'Node.js', category: 'Backend', level: 'Advanced', verified: true },
  { name: 'Express.js', category: 'Backend API', level: 'Advanced', verified: true },
  { name: 'MongoDB', category: 'Database', level: 'Advanced', verified: true },
  { name: 'HyperText Markup Language (HTML)', category: 'Frontend', level: 'Advanced', verified: true },
  { name: 'Cascading Style Sheets (CSS)', category: 'Styling', level: 'Advanced', verified: true },
  { name: 'JavaScript (ES6+)', category: 'Language', level: 'Advanced', verified: true },
  { name: 'React.js', category: 'Frontend', level: 'Advanced', verified: true },
  { name: 'Asynchronous Javascript', category: 'Core', level: 'Advanced', verified: true },
  { name: 'Bootstrap / Tailwind', category: 'UI Framework', level: 'Advanced', verified: true },
  { name: 'JSON Web Token (JWT)', category: 'Security', level: 'Advanced', verified: true }
];

export const INITIAL_KANBAN_TASKS: KanbanTask[] = [
  // Epic 1: Project Setup and Configuration (3 tasks)
  {
    id: 'task-1',
    epicId: 1,
    epicName: 'Project Setup and Configuration',
    title: 'Initialize Node.js & Vite/React Monorepo Structure',
    description: 'Set up development environment with package.json dependencies, TypeScript configs, and build scripts.',
    status: 'completed',
    skills: ['Node.js', 'React.js', 'Vite'],
    estimatedHours: 2
  },
  {
    id: 'task-2',
    epicId: 1,
    epicName: 'Project Setup and Configuration',
    title: 'Configure Express Router & Middleware Boilerplate',
    description: 'Initialize Express.js backend with JSON body parsing, CORS policies, and health check endpoints.',
    status: 'completed',
    skills: ['Express.js', 'Node.js'],
    estimatedHours: 2
  },
  {
    id: 'task-3',
    epicId: 1,
    epicName: 'Project Setup and Configuration',
    title: 'Environment Variable & Security Secret Management',
    description: 'Setup .env configuration for JWT secrets, API ports, and public weather endpoint URLs.',
    status: 'completed',
    skills: ['Node.js', 'JWT'],
    estimatedHours: 1
  },

  // Epic 2: Database Development (3 tasks)
  {
    id: 'task-4',
    epicId: 2,
    epicName: 'Database Development',
    title: 'Design MongoDB Schemas for Users & Roles',
    description: 'Create user schema with encrypted credentials, role enum (farmer/admin), contact details, and locale.',
    status: 'completed',
    skills: ['MongoDB', 'JavaScript'],
    estimatedHours: 3
  },
  {
    id: 'task-5',
    epicId: 2,
    epicName: 'Database Development',
    title: 'Develop Farm Holdings & Crop Lifecycle Data Models',
    description: 'Implement relational schema for farm plots, GPS coordinates, irrigation type, and soil NPK metrics.',
    status: 'completed',
    skills: ['MongoDB', 'JavaScript'],
    estimatedHours: 3
  },
  {
    id: 'task-6',
    epicId: 2,
    epicName: 'Database Development',
    title: 'Build Product Catalog & Order Fulfillment Schemas',
    description: 'Design schema for agricultural inputs (seeds, fertilizers, equipment) with inventory and tracking states.',
    status: 'completed',
    skills: ['MongoDB'],
    estimatedHours: 2
  },

  // Epic 3: Backend Development (4 tasks)
  {
    id: 'task-7',
    epicId: 3,
    epicName: 'Backend Development',
    title: 'Implement JWT Authentication & bcrypt Hashing',
    description: 'Secure registration, login controller, token verification middleware, and password hashing.',
    status: 'completed',
    skills: ['JSON Web Token (JWT)', 'Express.js', 'Node.js'],
    estimatedHours: 4
  },
  {
    id: 'task-8',
    epicId: 3,
    epicName: 'Backend Development',
    title: 'CRUD API Endpoints for Farm & Crop Tracking',
    description: 'Build REST endpoints for creating farm plots, adding crop cycles, and updating soil NPK / stage.',
    status: 'completed',
    skills: ['Express.js', 'Asynchronous Javascript'],
    estimatedHours: 4
  },
  {
    id: 'task-9',
    epicId: 3,
    epicName: 'Backend Development',
    title: 'Agricultural Pest & Weather Prediction Engine',
    description: 'Integrate Open-Meteo telemetry with rule-based heuristics for Blight, Root Rot, and Spider Mite alerts.',
    status: 'completed',
    skills: ['Express.js', 'Asynchronous Javascript'],
    estimatedHours: 3
  },
  {
    id: 'task-10',
    epicId: 3,
    epicName: 'Backend Development',
    title: 'Community Forum & Expert Consultation API',
    description: 'Implement forum discussion threads, category tagging, and agronomist verification flags.',
    status: 'completed',
    skills: ['Express.js', 'MongoDB'],
    estimatedHours: 3
  },

  // Epic 4: Front-end Development (4 tasks)
  {
    id: 'task-11',
    epicId: 4,
    epicName: 'Front-end Development',
    title: 'Responsive Farmer Dashboard with Real-Time Metrics',
    description: 'Design intuitive visual dashboard showing land acreage, active crops, weather, and pest alerts.',
    status: 'completed',
    skills: ['React.js', 'HTML', 'CSS', 'Bootstrap / Tailwind'],
    estimatedHours: 4
  },
  {
    id: 'task-12',
    epicId: 4,
    epicName: 'Front-end Development',
    title: 'Interactive Soil Health & Crop Stage Manager',
    description: 'Develop sliders for Nitrogen, Phosphorus, Potassium, pH, and soil moisture with threshold alerts.',
    status: 'completed',
    skills: ['React.js', 'JavaScript (ES6+)'],
    estimatedHours: 4
  },
  {
    id: 'task-13',
    epicId: 4,
    epicName: 'Front-end Development',
    title: 'Agri Marketplace with Cart & Order Tracking',
    description: 'Build searchable product catalog, category tabs, instant checkout, and delivery status timeline.',
    status: 'completed',
    skills: ['React.js', 'Asynchronous Javascript'],
    estimatedHours: 3
  },
  {
    id: 'task-14',
    epicId: 4,
    epicName: 'Front-end Development',
    title: 'Multilingual Support (English, Hindi, Telugu)',
    description: 'Implement language switcher and regional translation dictionary for rural farming accessibility.',
    status: 'completed',
    skills: ['React.js', 'JavaScript (ES6+)'],
    estimatedHours: 3
  },

  // Epic 5: Role-Based Security & Testing (3 tasks)
  {
    id: 'task-15',
    epicId: 5,
    epicName: 'Role-Based Security & Testing',
    title: 'Role-Based Route Protection (Farmer vs Admin)',
    description: 'Restrict Admin Console, inventory catalog management, and order status overrides to admin role.',
    status: 'completed',
    skills: ['JSON Web Token (JWT)', 'React.js'],
    estimatedHours: 2
  },
  {
    id: 'task-16',
    epicId: 5,
    epicName: 'Role-Based Security & Testing',
    title: 'Expert Consultation & Verified Answer Badging',
    description: 'Enable agronomists to provide authoritative advice stamped with "Expert Answered" seal.',
    status: 'completed',
    skills: ['React.js', 'Express.js'],
    estimatedHours: 2
  },
  {
    id: 'task-17',
    epicId: 5,
    epicName: 'Role-Based Security & Testing',
    title: 'End-to-End Workflow Testing with Mock Seed Data',
    description: 'Verify registration, farm addition, crop lifecycle, ordering, and advice workflows.',
    status: 'completed',
    skills: ['JavaScript (ES6+)', 'Node.js'],
    estimatedHours: 3
  },

  // Epic 6: Monitoring & Optimization (2 tasks)
  {
    id: 'task-18',
    epicId: 6,
    epicName: 'Monitoring & Optimization',
    title: 'Client-Side State Persistence & Storage Optimization',
    description: 'Implement LocalStorage synchronization to preserve farms, crops, orders, and forum discussions.',
    status: 'completed',
    skills: ['React.js', 'JavaScript (ES6+)'],
    estimatedHours: 2
  },
  {
    id: 'task-19',
    epicId: 6,
    epicName: 'Monitoring & Optimization',
    title: 'Skillwallet Evaluation Integration & Demo Link Submission',
    description: 'Connect project overview stats, Kanban board progress calculation, and mentor review submission.',
    status: 'completed',
    skills: ['React.js', 'HTML', 'CSS'],
    estimatedHours: 2
  }
];

export const INITIAL_METADATA: ProjectMetadata = {
  demoUrl: 'https://ais-dev-aay23fp7u3hex4kt2625gc-978904214745.asia-east1.run.app',
  githubUrl: 'https://github.com/chhiroliyashraddheya/agritech-smart-farming-mern',
  mentorStatus: 'No mentor assigned yet',
  submittedAt: '2026-10-19T04:48:00Z'
};
