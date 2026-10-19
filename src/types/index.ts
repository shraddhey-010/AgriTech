export type Role = 'farmer' | 'admin';

export type Language = 'en' | 'hi' | 'te';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone: string;
  location: string;
  language: Language;
  token?: string;
}

export interface Farm {
  id: string;
  ownerId: string;
  farmName: string;
  totalAreaAcre: number;
  location: {
    state: string;
    district: string;
    latitude?: number;
    longitude?: number;
  };
  irrigationType: 'Drip' | 'Sprinkler' | 'Canal' | 'Rainfed';
  createdAt: string;
}

export type CropStatus = 'Sowing' | 'Vegetative' | 'Flowering' | 'Harvest-Ready' | 'Harvested';

export interface SoilMetrics {
  nitrogen_N: number; // kg/ha (standard: 100-150)
  phosphorus_P: number; // kg/ha (standard: 30-60)
  potassium_K: number; // kg/ha (standard: 40-80)
  pH: number; // standard: 6.0 - 7.5
  moisturePercent: number; // % (standard: 40-70)
}

export interface Crop {
  id: string;
  farmId: string;
  farmName?: string;
  farmerId: string;
  cropName: string;
  variety: string;
  plantedDate: string;
  expectedHarvestDate: string;
  soilMetrics: SoilMetrics;
  status: CropStatus;
  createdAt: string;
}

export type ProductCategory = 'Seed' | 'Fertilizer' | 'Pesticide' | 'Equipment';

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  price: number;
  stock: number;
  description: string;
  unit: string;
  imageUrl?: string;
  rating?: number;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  productId: string;
  title: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  farmerId: string;
  farmerName?: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress: string;
  status: OrderStatus;
  createdAt: string;
}

export interface ForumReply {
  id: string;
  responderId: string;
  responderName: string;
  role: Role;
  message: string;
  createdAt: string;
}

export interface ForumPost {
  id: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  category: 'Pest Control' | 'Soil Health' | 'Crop Advisory' | 'Subsidies' | 'Market Prices';
  replies: ForumReply[];
  isExpertReviewed: boolean;
  createdAt: string;
}

export interface PestAlert {
  type: 'High Risk' | 'Moderate Risk' | 'Waterlogging Alert' | 'Low Risk';
  pest: string;
  cropAffected?: string;
  recommendation: string;
  severity: 'critical' | 'warning' | 'info';
}

export interface WeatherTelemetry {
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  weatherCode: number;
  daily: {
    dates: string[];
    maxTemps: number[];
    minTemps: number[];
    precipSums: number[];
  };
}

export type TaskStatus = 'todo' | 'inprogress' | 'completed';

export interface KanbanTask {
  id: string;
  epicId: number;
  epicName: string;
  title: string;
  description: string;
  status: TaskStatus;
  skills: string[];
  estimatedHours: number;
}

export interface SkillItem {
  name: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  verified: boolean;
  icon?: string;
}

export interface ProjectMetadata {
  demoUrl: string;
  githubUrl: string;
  mentorStatus: 'No mentor assigned yet' | 'Review Requested' | 'Approved';
  reviewNotes?: string;
  submittedAt?: string;
}
