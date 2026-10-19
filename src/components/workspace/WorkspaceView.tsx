import React, { useState } from 'react';
import {
  User,
  Farm,
  Crop,
  Product,
  Order,
  ForumPost,
  WeatherTelemetry,
  PestAlert,
  Language,
  CropStatus,
  SoilMetrics,
  OrderItem,
  OrderStatus
} from '../../types';
import { WorkspaceNavbar } from './WorkspaceNavbar';
import { FarmerDashboard } from './FarmerDashboard';
import { FarmsAndCropsView } from './FarmsAndCropsView';
import { WeatherPestView } from './WeatherPestView';
import { MarketplaceView } from './MarketplaceView';
import { CommunityForumView } from './CommunityForumView';
import { AdminConsoleView } from './AdminConsoleView';
import { AiAgronomistModal } from './AiAgronomistModal';

interface WorkspaceViewProps {
  currentUser: User;
  onSwitchUser: (role: 'farmer' | 'admin') => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  farms: Farm[];
  crops: Crop[];
  products: Product[];
  orders: Order[];
  forumPosts: ForumPost[];
  weather: WeatherTelemetry;
  pestAlerts: PestAlert[];
  isWeatherLoading: boolean;
  onRefreshWeather: (lat: number, lon: number) => void;
  onAddFarm: (farm: Omit<Farm, 'id' | 'createdAt'>) => void;
  onDeleteFarm: (id: string) => void;
  onAddCrop: (crop: Omit<Crop, 'id' | 'createdAt'>) => void;
  onUpdateCrop: (
    cropId: string,
    updates: Partial<{ status: CropStatus; soilMetrics: SoilMetrics }>
  ) => void;
  onPlaceOrder: (items: OrderItem[], deliveryAddress: string) => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onCreateForumPost: (title: string, content: string, category: ForumPost['category']) => void;
  onAddForumReply: (postId: string, message: string) => void;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  currentUser,
  onSwitchUser,
  language,
  onLanguageChange,
  farms,
  crops,
  products,
  orders,
  forumPosts,
  weather,
  pestAlerts,
  isWeatherLoading,
  onRefreshWeather,
  onAddFarm,
  onDeleteFarm,
  onAddCrop,
  onUpdateCrop,
  onPlaceOrder,
  onAddProduct,
  onUpdateOrderStatus,
  onCreateForumPost,
  onAddForumReply
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'dashboard' | 'farms' | 'weather' | 'marketplace' | 'forum' | 'admin'
  >('dashboard');
  const [isAiDoctorOpen, setIsAiDoctorOpen] = useState(false);

  return (
    <div className="min-h-[750px] bg-slate-950 text-slate-100 flex flex-col">
      {/* Workspace Navbar */}
      <WorkspaceNavbar
        currentUser={currentUser}
        onSwitchUser={onSwitchUser}
        language={language}
        onLanguageChange={onLanguageChange}
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
        cartCount={0}
        onOpenAiDoctor={() => setIsAiDoctorOpen(true)}
      />

      {/* Main Workspace Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
        {activeSubTab === 'dashboard' && (
          <FarmerDashboard
            currentUser={currentUser}
            farms={farms}
            crops={crops}
            weather={weather}
            pestAlerts={pestAlerts}
            language={language}
            onNavigateToFarms={() => setActiveSubTab('farms')}
            onNavigateToWeather={() => setActiveSubTab('weather')}
          />
        )}

        {activeSubTab === 'farms' && (
          <FarmsAndCropsView
            farms={farms}
            crops={crops}
            onAddFarm={onAddFarm}
            onDeleteFarm={onDeleteFarm}
            onAddCrop={onAddCrop}
            onUpdateCrop={onUpdateCrop}
          />
        )}

        {activeSubTab === 'weather' && (
          <WeatherPestView
            weather={weather}
            pestAlerts={pestAlerts}
            isLoading={isWeatherLoading}
            onRefreshWeather={onRefreshWeather}
          />
        )}

        {activeSubTab === 'marketplace' && (
          <MarketplaceView
            products={products}
            orders={orders}
            onPlaceOrder={onPlaceOrder}
            farmerAddress={currentUser.location}
          />
        )}

        {activeSubTab === 'forum' && (
          <CommunityForumView
            posts={forumPosts}
            currentUser={currentUser}
            onCreatePost={onCreateForumPost}
            onAddReply={onAddForumReply}
          />
        )}

        {activeSubTab === 'admin' && (
          <AdminConsoleView
            products={products}
            orders={orders}
            onAddProduct={onAddProduct}
            onUpdateOrderStatus={onUpdateOrderStatus}
          />
        )}
      </div>

      {/* AI Crop Doctor Modal */}
      <AiAgronomistModal
        isOpen={isAiDoctorOpen}
        onClose={() => setIsAiDoctorOpen(false)}
      />
    </div>
  );
};
