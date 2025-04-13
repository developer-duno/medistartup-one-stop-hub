
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash2, Plus, MapPin, BarChart3, Building2, FileCheck, Users, Briefcase, Package } from 'lucide-react';
import { useServices } from '@/contexts/ServicesContext';
import ServiceForm from './ServiceForm';
import { useToast } from '@/hooks/use-toast';
import { Service } from '@/types/service';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const ServicesManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { services, updateService, deleteService, getServicesByCategory } = useServices();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);
  const { toast } = useToast();

  const getIconComponent = (iconName: string) => {
    switch(iconName) {
      case 'MapPin': return <MapPin className="h-5 w-5 text-primary" />;
      case 'BarChart3': return <BarChart3 className="h-5 w-5 text-secondary" />;
      case 'Building2': return <Building2 className="h-5 w-5 text-accent" />;
      case 'FileCheck': return <FileCheck className="h-5 w-5 text-primary" />;
      case 'Users': return <Users className="h-5 w-5 text-secondary" />;
      case 'Briefcase': return <Briefcase className="h-5 w-5 text-accent" />;
      case 'Package': return <Package className="h-5 w-5 text-primary" />;
      case 'Trash2': return <Trash2 className="h-5 w-5 text-secondary" />;
      default: return <MapPin className="h-5 w-5 text-primary" />;
    }
  };

  const handleOpenAddForm = () => {
    setEditingService(null);
    setIsFormOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setServiceToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (serviceToDelete !== null) {
      deleteService(serviceToDelete);
      setDeleteDialogOpen(false);
      setServiceToDelete(null);
    }
  };

  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'planning': return '계획 단계';
      case 'implementation': return '개원 단계';
      case 'equipment': return '설비 및 장비';
      case 'operation': return '운영 단계';
      default: return category;
    }
  };

  const filteredServices = getServicesByCategory(activeTab);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-pretendard font-bold text-2xl">서비스 관리</h2>
        <Button variant="default" onClick={handleOpenAddForm}>
          <Plus className="h-4 w-4 mr-2" />
          새 서비스 추가
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="planning">계획 단계</TabsTrigger>
          <TabsTrigger value="implementation">개원 단계</TabsTrigger>
          <TabsTrigger value="equipment">설비 및 장비</TabsTrigger>
          <TabsTrigger value="operation">운영 단계</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <Card key={service.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    {getIconComponent(service.icon)}
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="line-clamp-2 h-10">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-sm text-muted-foreground">
                    {getCategoryLabel(service.category)}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={service.path} target="_blank">
                      <Eye className="h-4 w-4 mr-1" />
                      보기
                    </Link>
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="secondary" size="sm" onClick={() => handleEditService(service)}>
                      <Edit className="h-4 w-4 mr-1" />
                      수정
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(service.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      삭제
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {isFormOpen && (
        <ServiceForm 
          isOpen={isFormOpen}
          service={editingService} 
          onClose={() => setIsFormOpen(false)}
        />
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <div className="p-4">
            <h3 className="font-semibold text-xl mb-4">서비스를 삭제하시겠습니까?</h3>
            <p className="mb-6 text-gray-600">이 동작은 되돌릴 수 없으며 서비스가 영구적으로 삭제됩니다.</p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                취소
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                삭제
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesManagement;
