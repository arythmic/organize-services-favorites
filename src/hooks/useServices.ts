import { useState, useEffect } from 'react';
import { Service, ServiceFormData } from '@/types/Service';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';

const STORAGE_KEY = 'free-services-tracker';

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setServices(parsed.map((s: any) => ({
          ...s,
          createdAt: new Date(s.createdAt),
          updatedAt: new Date(s.updatedAt)
        })));
      } catch (error) {
        console.error('Failed to parse stored services:', error);
      }
    }
    setLoading(false);
  }, []);

  const saveToStorage = (newServices: Service[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newServices));
  };

  const addService = (data: ServiceFormData) => {
    const newService: Service = {
      id: uuidv4(),
      ...data,
      isFavorite: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const updated = [...services, newService];
    setServices(updated);
    saveToStorage(updated);
    toast({ title: 'Service added successfully!' });
    return newService;
  };

  const updateService = (id: string, data: Partial<ServiceFormData>) => {
    const updated = services.map(s => 
      s.id === id ? { ...s, ...data, updatedAt: new Date() } : s
    );
    setServices(updated);
    saveToStorage(updated);
    toast({ title: 'Service updated successfully!' });
  };

  const deleteService = (id: string) => {
    const updated = services.filter(s => s.id !== id);
    setServices(updated);
    saveToStorage(updated);
    toast({ title: 'Service deleted successfully!' });
  };

  const toggleFavorite = (id: string) => {
    const updated = services.map(s => 
      s.id === id ? { ...s, isFavorite: !s.isFavorite, updatedAt: new Date() } : s
    );
    setServices(updated);
    saveToStorage(updated);
  };

  return {
    services,
    loading,
    addService,
    updateService,
    deleteService,
    toggleFavorite
  };
};