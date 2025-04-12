
import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Home, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminSidebar from './AdminSidebar';
import { useToast } from '@/components/ui/use-toast';

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

  const handleSaveChanges = () => {
    toast({
      title: "변경사항 저장됨",
      description: "웹사이트에 변경사항이 적용되었습니다.",
      variant: "success",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-pretendard font-bold text-xl">관리자 대시보드</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="bg-primary-700 border-white text-white hover:bg-primary-800" onClick={handleSaveChanges}>
              <Save className="h-4 w-4 mr-2" />
              변경사항 저장
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                사이트로 이동
              </Link>
            </Button>
            <Button variant="outline" size="icon" className="border-white text-white hover:bg-primary-800">
              <Lock className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          <main className="flex-1 bg-white rounded-lg shadow-md p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
