import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ExternalLink, Edit, Trash2, DollarSign } from 'lucide-react';
import { Service } from '@/types/Service';

interface ServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onEdit,
  onDelete,
  onToggleFavorite
}) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
              {service.name}
            </CardTitle>
            <Badge variant="secondary" className="mt-1">
              {service.category}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(service.id)}
            className={service.isFavorite ? 'text-red-500' : 'text-gray-400'}
          >
            <Heart className={`h-4 w-4 ${service.isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {service.description}
        </p>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-1">Free Limitations:</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {service.limitations}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" asChild>
            <a href={service.loginUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 mr-1" />
              Login
            </a>
          </Button>
          {service.pricingUrl && (
            <Button size="sm" variant="outline" asChild>
              <a href={service.pricingUrl} target="_blank" rel="noopener noreferrer">
                <DollarSign className="h-3 w-3 mr-1" />
                Pricing
              </a>
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={() => onEdit(service)}>
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button size="sm" variant="destructive" onClick={() => onDelete(service.id)}>
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};