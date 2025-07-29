import React, { useState } from 'react';
import { ServiceList } from './ServiceList';
import { ServiceForm } from './ServiceForm';
import { useServices } from '@/hooks/useServices';
import { Service, ServiceFormData } from '@/types/Service';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Heart, Grid3X3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const Dashboard: React.FC = () => {
  const { services, loading, addService, updateService, deleteService, toggleFavorite } = useServices();
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const favoriteServices = services.filter(s => s.isFavorite);

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleFormSubmit = (data: ServiceFormData) => {
    if (editingService) {
      updateService(editingService.id, data);
    } else {
      addService(data);
    }
    setEditingService(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingService(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Free Services Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Keep track of your favorite free online services
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center">
            <Grid3X3 className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Total Services</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">{services.length}</p>
        </div>
        <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center">
            <Heart className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-sm font-medium text-red-900 dark:text-red-100">Favorites</span>
          </div>
          <p className="text-2xl font-bold text-red-900 dark:text-red-100 mt-1">{favoriteServices.length}</p>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center">
            <Badge className="bg-green-600 text-white mr-2">Categories</Badge>
          </div>
          <p className="text-2xl font-bold text-green-900 dark:text-green-100 mt-1">
            {new Set(services.map(s => s.category)).size}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4" />
            All Services
            <Badge variant="secondary">{services.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Favorites
            <Badge variant="secondary">{favoriteServices.length}</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <ServiceList
            services={services}
            onEdit={handleEdit}
            onDelete={deleteService}
            onToggleFavorite={toggleFavorite}
          />
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-6">
          <ServiceList
            services={services}
            onEdit={handleEdit}
            onDelete={deleteService}
            onToggleFavorite={toggleFavorite}
            showFavoritesOnly
          />
        </TabsContent>
      </Tabs>

      {/* Form Modal */}
      <ServiceForm
        open={showForm}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        editingService={editingService}
      />
    </div>
  );
};