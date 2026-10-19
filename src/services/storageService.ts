import {
  User,
  Farm,
  Crop,
  Product,
  Order,
  ForumPost,
  KanbanTask,
  ProjectMetadata,
  Language,
  SoilMetrics,
  CropStatus
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_FARMS,
  INITIAL_CROPS,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_FORUM_POSTS,
  INITIAL_KANBAN_TASKS,
  INITIAL_METADATA
} from '../data/initialData';

const STORAGE_KEYS = {
  CURRENT_USER: 'agritech_current_user',
  FARMS: 'agritech_farms',
  CROPS: 'agritech_crops',
  PRODUCTS: 'agritech_products',
  ORDERS: 'agritech_orders',
  FORUM_POSTS: 'agritech_forum_posts',
  KANBAN_TASKS: 'agritech_kanban_tasks',
  METADATA: 'agritech_metadata',
  LANGUAGE: 'agritech_language',
  CREDITS: 'agritech_credits'
};

function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch (e) {
    console.error(`Error loading key ${key} from storage:`, e);
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error setting key ${key} in storage:`, e);
  }
}

export const StorageService = {
  getCurrentUser(): User {
    return getItem<User>(STORAGE_KEYS.CURRENT_USER, INITIAL_USERS[0]);
  },
  setCurrentUser(user: User): void {
    setItem(STORAGE_KEYS.CURRENT_USER, user);
  },
  getAllUsers(): User[] {
    return INITIAL_USERS;
  },

  getLanguage(): Language {
    return getItem<Language>(STORAGE_KEYS.LANGUAGE, 'en');
  },
  setLanguage(lang: Language): void {
    setItem(STORAGE_KEYS.LANGUAGE, lang);
  },

  getCredits(): { aiTokens: number; credits: number } {
    return getItem(STORAGE_KEYS.CREDITS, { aiTokens: 0, credits: 300 });
  },
  setCredits(credits: { aiTokens: number; credits: number }): void {
    setItem(STORAGE_KEYS.CREDITS, credits);
  },

  getFarms(): Farm[] {
    return getItem<Farm[]>(STORAGE_KEYS.FARMS, INITIAL_FARMS);
  },
  saveFarms(farms: Farm[]): void {
    setItem(STORAGE_KEYS.FARMS, farms);
  },
  addFarm(farmData: Omit<Farm, 'id' | 'createdAt'>): Farm {
    const farms = this.getFarms();
    const newFarm: Farm = {
      ...farmData,
      id: `farm-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newFarm, ...farms];
    this.saveFarms(updated);
    return newFarm;
  },
  deleteFarm(id: string): void {
    const farms = this.getFarms().filter((f) => f.id !== id);
    this.saveFarms(farms);
    const crops = this.getCrops().filter((c) => c.farmId !== id);
    this.saveCrops(crops);
  },

  getCrops(): Crop[] {
    return getItem<Crop[]>(STORAGE_KEYS.CROPS, INITIAL_CROPS);
  },
  saveCrops(crops: Crop[]): void {
    setItem(STORAGE_KEYS.CROPS, crops);
  },
  addCrop(cropData: Omit<Crop, 'id' | 'createdAt'>): Crop {
    const crops = this.getCrops();
    const newCrop: Crop = {
      ...cropData,
      id: `crop-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newCrop, ...crops];
    this.saveCrops(updated);
    return newCrop;
  },
  updateCrop(
    cropId: string,
    updates: Partial<{ status: CropStatus; soilMetrics: SoilMetrics; cropName: string }>
  ): Crop | null {
    const crops = this.getCrops();
    const idx = crops.findIndex((c) => c.id === cropId);
    if (idx === -1) return null;
    crops[idx] = { ...crops[idx], ...updates };
    this.saveCrops(crops);
    return crops[idx];
  },

  getProducts(): Product[] {
    return getItem<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  },
  saveProducts(products: Product[]): void {
    setItem(STORAGE_KEYS.PRODUCTS, products);
  },
  addProduct(productData: Omit<Product, 'id'>): Product {
    const products = this.getProducts();
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    const updated = [newProduct, ...products];
    this.saveProducts(updated);
    return newProduct;
  },

  getOrders(): Order[] {
    return getItem<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  },
  saveOrders(orders: Order[]): void {
    setItem(STORAGE_KEYS.ORDERS, orders);
  },
  createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Order {
    const orders = this.getOrders();
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newOrder, ...orders];
    this.saveOrders(updated);
    return newOrder;
  },
  updateOrderStatus(orderId: string, status: Order['status']): void {
    const orders = this.getOrders();
    const idx = orders.findIndex((o) => o.id === orderId);
    if (idx !== -1) {
      orders[idx].status = status;
      this.saveOrders(orders);
    }
  },

  getForumPosts(): ForumPost[] {
    return getItem<ForumPost[]>(STORAGE_KEYS.FORUM_POSTS, INITIAL_FORUM_POSTS);
  },
  saveForumPosts(posts: ForumPost[]): void {
    setItem(STORAGE_KEYS.FORUM_POSTS, posts);
  },
  createForumPost(postData: Omit<ForumPost, 'id' | 'createdAt' | 'replies' | 'isExpertReviewed'>): ForumPost {
    const posts = this.getForumPosts();
    const newPost: ForumPost = {
      ...postData,
      id: `post-${Date.now()}`,
      replies: [],
      isExpertReviewed: false,
      createdAt: new Date().toISOString()
    };
    const updated = [newPost, ...posts];
    this.saveForumPosts(updated);
    return newPost;
  },
  addReplyToPost(
    postId: string,
    reply: { responderId: string; responderName: string; role: User['role']; message: string }
  ): ForumPost | null {
    const posts = this.getForumPosts();
    const post = posts.find((p) => p.id === postId);
    if (!post) return null;

    post.replies.push({
      id: `reply-${Date.now()}`,
      ...reply,
      createdAt: new Date().toISOString()
    });

    if (reply.role === 'admin') {
      post.isExpertReviewed = true;
    }

    this.saveForumPosts(posts);
    return post;
  },

  getKanbanTasks(): KanbanTask[] {
    return getItem<KanbanTask[]>(STORAGE_KEYS.KANBAN_TASKS, INITIAL_KANBAN_TASKS);
  },
  saveKanbanTasks(tasks: KanbanTask[]): void {
    setItem(STORAGE_KEYS.KANBAN_TASKS, tasks);
  },
  updateTaskStatus(taskId: string, status: KanbanTask['status']): void {
    const tasks = this.getKanbanTasks();
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.status = status;
      this.saveKanbanTasks(tasks);
    }
  },

  getMetadata(): ProjectMetadata {
    return getItem<ProjectMetadata>(STORAGE_KEYS.METADATA, INITIAL_METADATA);
  },
  saveMetadata(metadata: ProjectMetadata): void {
    setItem(STORAGE_KEYS.METADATA, metadata);
  },

  resetToDefaults(): void {
    localStorage.clear();
    setItem(STORAGE_KEYS.CURRENT_USER, INITIAL_USERS[0]);
    setItem(STORAGE_KEYS.FARMS, INITIAL_FARMS);
    setItem(STORAGE_KEYS.CROPS, INITIAL_CROPS);
    setItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    setItem(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    setItem(STORAGE_KEYS.FORUM_POSTS, INITIAL_FORUM_POSTS);
    setItem(STORAGE_KEYS.KANBAN_TASKS, INITIAL_KANBAN_TASKS);
    setItem(STORAGE_KEYS.METADATA, INITIAL_METADATA);
    setItem(STORAGE_KEYS.LANGUAGE, 'en');
    setItem(STORAGE_KEYS.CREDITS, { aiTokens: 0, credits: 300 });
  }
};
