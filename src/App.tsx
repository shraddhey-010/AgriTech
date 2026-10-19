/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
  CropStatus,
  SoilMetrics,
  OrderItem,
  OrderStatus,
  WeatherTelemetry,
  PestAlert
} from './types';
import { StorageService } from './services/storageService';
import { fetchWeatherTelemetry } from './services/weatherService';
import { INITIAL_SKILLS } from './data/initialData';

import { SkillwalletHeader } from './components/SkillwalletHeader';
import { ProjectSubheader } from './components/ProjectSubheader';
import { OverviewTab } from './components/OverviewTab';
import { KanbanTab } from './components/KanbanTab';
import { SkillWalletTab } from './components/SkillWalletTab';
import { DemoGithubModal } from './components/DemoGithubModal';
import { WorkspaceView } from './components/workspace/WorkspaceView';

export default function App() {
  // Navigation State
  const [activeMainTab, setActiveMainTab] = useState<'overview' | 'workspace' | 'kanban' | 'skillwallet'>('workspace');
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);

  // Core Data State
  const [currentUser, setCurrentUser] = useState<User>(StorageService.getCurrentUser());
  const [language, setLanguage] = useState<Language>(StorageService.getLanguage());
  const [credits, setCredits] = useState(StorageService.getCredits());
  const [metadata, setMetadata] = useState<ProjectMetadata>(StorageService.getMetadata());

  const [farms, setFarms] = useState<Farm[]>(StorageService.getFarms());
  const [crops, setCrops] = useState<Crop[]>(StorageService.getCrops());
  const [products, setProducts] = useState<Product[]>(StorageService.getProducts());
  const [orders, setOrders] = useState<Order[]>(StorageService.getOrders());
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(StorageService.getForumPosts());
  const [kanbanTasks, setKanbanTasks] = useState<KanbanTask[]>(StorageService.getKanbanTasks());

  // Weather & Pest Telemetry
  const [weather, setWeather] = useState<WeatherTelemetry>({
    temperature: 28.5,
    humidity: 68,
    windSpeed: 13.5,
    precipitation: 2.4,
    weatherCode: 2,
    daily: {
      dates: ['Today', 'Tomorrow', '+2 Days', '+3 Days', '+4 Days'],
      maxTemps: [31, 32, 30, 29, 31],
      minTemps: [22, 23, 21, 20, 21],
      precipSums: [2.4, 0, 4.5, 1.2, 0]
    }
  });
  const [pestAlerts, setPestAlerts] = useState<PestAlert[]>([]);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);

  // Initial Weather Fetch
  const loadWeather = async (lat: number = 19.9975, lon: number = 73.7898) => {
    setIsWeatherLoading(true);
    try {
      const result = await fetchWeatherTelemetry(lat, lon);
      setWeather(result.weather);
      setPestAlerts(result.pestAlerts);
    } catch (e) {
      console.error('Failed to load weather:', e);
    } finally {
      setIsWeatherLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, []);

  // Recalculate Project Progress %
  const totalTasks = kanbanTasks.length;
  const completedTasks = kanbanTasks.filter((t) => t.status === 'completed').length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Handlers
  const handleSwitchUser = (role: 'farmer' | 'admin') => {
    const allUsers = StorageService.getAllUsers();
    const target = allUsers.find((u) => u.role === role) || allUsers[0];
    setCurrentUser(target);
    StorageService.setCurrentUser(target);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    StorageService.setLanguage(lang);
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: KanbanTask['status']) => {
    StorageService.updateTaskStatus(taskId, newStatus);
    setKanbanTasks(StorageService.getKanbanTasks());
  };

  const handleCompleteAllTasks = () => {
    const updated = kanbanTasks.map((t) => ({ ...t, status: 'completed' as const }));
    StorageService.saveKanbanTasks(updated);
    setKanbanTasks(updated);
    // Award bonus credits for capstone completion
    const newCredits = { aiTokens: 50, credits: 450 };
    StorageService.setCredits(newCredits);
    setCredits(newCredits);
  };

  const handleAddFarm = (farmData: Omit<Farm, 'id' | 'createdAt'>) => {
    const newFarm = StorageService.addFarm(farmData);
    setFarms(StorageService.getFarms());
  };

  const handleDeleteFarm = (id: string) => {
    StorageService.deleteFarm(id);
    setFarms(StorageService.getFarms());
    setCrops(StorageService.getCrops());
  };

  const handleAddCrop = (cropData: Omit<Crop, 'id' | 'createdAt'>) => {
    StorageService.addCrop(cropData);
    setCrops(StorageService.getCrops());
  };

  const handleUpdateCrop = (
    cropId: string,
    updates: Partial<{ status: CropStatus; soilMetrics: SoilMetrics }>
  ) => {
    StorageService.updateCrop(cropId, updates);
    setCrops(StorageService.getCrops());
  };

  const handlePlaceOrder = (items: OrderItem[], deliveryAddress: string) => {
    const totalAmount = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    StorageService.createOrder({
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      items,
      totalAmount,
      deliveryAddress,
      status: 'Processing'
    });
    setOrders(StorageService.getOrders());
  };

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    StorageService.addProduct(productData);
    setProducts(StorageService.getProducts());
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    StorageService.updateOrderStatus(orderId, status);
    setOrders(StorageService.getOrders());
  };

  const handleCreateForumPost = (
    title: string,
    content: string,
    category: ForumPost['category']
  ) => {
    StorageService.createForumPost({
      authorId: currentUser.id,
      authorName: currentUser.name,
      title,
      content,
      category
    });
    setForumPosts(StorageService.getForumPosts());
  };

  const handleAddForumReply = (postId: string, message: string) => {
    StorageService.addReplyToPost(postId, {
      responderId: currentUser.id,
      responderName: currentUser.name,
      role: currentUser.role,
      message
    });
    setForumPosts(StorageService.getForumPosts());
  };

  const handleSaveMetadata = (newMeta: ProjectMetadata) => {
    StorageService.saveMetadata(newMeta);
    setMetadata(newMeta);
  };

  const handleAddBonusCredits = () => {
    const newCredits = {
      aiTokens: credits.aiTokens + 25,
      credits: credits.credits + 100
    };
    StorageService.setCredits(newCredits);
    setCredits(newCredits);
  };

  const handleResetData = () => {
    if (confirm('Reset all demo data to initial factory seeds?')) {
      StorageService.resetToDefaults();
      setCurrentUser(StorageService.getCurrentUser());
      setFarms(StorageService.getFarms());
      setCrops(StorageService.getCrops());
      setProducts(StorageService.getProducts());
      setOrders(StorageService.getOrders());
      setForumPosts(StorageService.getForumPosts());
      setKanbanTasks(StorageService.getKanbanTasks());
      setMetadata(StorageService.getMetadata());
      setLanguage('en');
      setCredits({ aiTokens: 0, credits: 300 });
      loadWeather();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Skillwallet Platform Header */}
      <SkillwalletHeader
        currentUser={currentUser}
        activeMainTab={activeMainTab}
        setActiveMainTab={setActiveMainTab}
        credits={credits}
        onOpenLinksModal={() => setIsLinksModalOpen(true)}
        onResetData={handleResetData}
      />

      {/* Project Subheader & Evaluation Navigation */}
      <ProjectSubheader
        activeMainTab={activeMainTab}
        setActiveMainTab={setActiveMainTab}
        progressPercent={progressPercent}
        metadata={metadata}
        onOpenLinksModal={() => setIsLinksModalOpen(true)}
        totalTasks={totalTasks}
        completedTasks={completedTasks}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeMainTab === 'overview' && (
          <OverviewTab
            metadata={metadata}
            onOpenLinksModal={() => setIsLinksModalOpen(true)}
            skills={INITIAL_SKILLS}
            progressPercent={progressPercent}
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            onLaunchWorkspace={() => setActiveMainTab('workspace')}
            onRequestMentorReview={() => setIsLinksModalOpen(true)}
          />
        )}

        {activeMainTab === 'workspace' && (
          <WorkspaceView
            currentUser={currentUser}
            onSwitchUser={handleSwitchUser}
            language={language}
            onLanguageChange={handleLanguageChange}
            farms={farms}
            crops={crops}
            products={products}
            orders={orders}
            forumPosts={forumPosts}
            weather={weather}
            pestAlerts={pestAlerts}
            isWeatherLoading={isWeatherLoading}
            onRefreshWeather={loadWeather}
            onAddFarm={handleAddFarm}
            onDeleteFarm={handleDeleteFarm}
            onAddCrop={handleAddCrop}
            onUpdateCrop={handleUpdateCrop}
            onPlaceOrder={handlePlaceOrder}
            onAddProduct={handleAddProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onCreateForumPost={handleCreateForumPost}
            onAddForumReply={handleAddForumReply}
          />
        )}

        {activeMainTab === 'kanban' && (
          <KanbanTab
            tasks={kanbanTasks}
            onUpdateTaskStatus={handleUpdateTaskStatus}
            onCompleteAllTasks={handleCompleteAllTasks}
          />
        )}

        {activeMainTab === 'skillwallet' && (
          <SkillWalletTab
            skills={INITIAL_SKILLS}
            credits={credits}
            onAddBonusCredits={handleAddBonusCredits}
          />
        )}
      </main>

      {/* Submit Demo & GitHub Links Modal */}
      <DemoGithubModal
        isOpen={isLinksModalOpen}
        onClose={() => setIsLinksModalOpen(false)}
        metadata={metadata}
        onSave={handleSaveMetadata}
      />
    </div>
  );
}
