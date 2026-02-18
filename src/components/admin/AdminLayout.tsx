
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Home, Save, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminSidebar from './AdminSidebar';
import { useToast } from '@/components/ui/use-toast';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  activeSection,
  setActiveSection
}) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSaveChanges = () => {
    toast({
      title: "변경사항 저장됨",
      description: "웹사이트에 변경사항이 적용되었습니다.",
      variant: "default",
    });
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            {isMobile && (
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-primary-800">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72">
                  <AdminSidebar activeSection={activeSection} setActiveSection={handleSectionChange} />
                </SheetContent>
              </Sheet>
            )}
            <h1 className="font-pretendard font-bold text-lg md:text-xl">관리자 대시보드</h1>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button variant="outline" size="sm" className="bg-primary-700 border-white text-white hover:bg-primary-800" onClick={handleSaveChanges}>
              <Save className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">변경사항 저장</span>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/">
                <Home className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">사이트로 이동</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" className="border-white text-white hover:bg-primary-800 hidden md:flex">
              <Lock className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex gap-6">
          {!isMobile && (
            <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          )}
          <main className="flex-1 bg-white rounded-lg shadow-md p-4 md:p-6 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
