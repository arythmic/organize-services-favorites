import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ServiceFormData, CATEGORIES, Service } from '@/types/Service';

interface ServiceFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ServiceFormData) => void;
  editingService?: Service | null;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({
  open,
  onClose,
  onSubmit,
  editingService
}) => {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<ServiceFormData>({
    defaultValues: editingService ? {
      name: editingService.name,
      category: editingService.category,
      description: editingService.description,
      limitations: editingService.limitations,
      loginUrl: editingService.loginUrl,
      pricingUrl: editingService.pricingUrl || ''
    } : {
      name: '',
      category: '',
      description: '',
      limitations: '',
      loginUrl: '',
      pricingUrl: ''
    }
  });

  const category = watch('category');

  React.useEffect(() => {
    if (editingService) {
      reset({
        name: editingService.name,
        category: editingService.category,
        description: editingService.description,
        limitations: editingService.limitations,
        loginUrl: editingService.loginUrl,
        pricingUrl: editingService.pricingUrl || ''
      });
    } else {
      reset({
        name: '',
        category: '',
        description: '',
        limitations: '',
        loginUrl: '',
        pricingUrl: ''
      });
    }
  }, [editingService, reset]);

  const handleFormSubmit = (data: ServiceFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingService ? 'Edit Service' : 'Add New Service'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Service Name</Label>
            <Input
              id="name"
              {...register('name', { required: 'Name is required' })}
              placeholder="e.g., Google Drive"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(value) => setValue('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description', { required: 'Description is required' })}
              placeholder="Brief description of the service"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="limitations">Free Limitations</Label>
            <Textarea
              id="limitations"
              {...register('limitations', { required: 'Limitations are required' })}
              placeholder="What are the free tier limitations?"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="loginUrl">Login URL</Label>
            <Input
              id="loginUrl"
              {...register('loginUrl', { required: 'Login URL is required' })}
              placeholder="https://..."
              type="url"
            />
          </div>

          <div>
            <Label htmlFor="pricingUrl">Pricing URL (Optional)</Label>
            <Input
              id="pricingUrl"
              {...register('pricingUrl')}
              placeholder="https://..."
              type="url"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {editingService ? 'Update' : 'Add'} Service
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};