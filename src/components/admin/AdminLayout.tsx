
import React from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminSidebar from './AdminSidebar';

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
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-pretendard font-bold text-xl">관리자 대시보드</h1>
          <div className="flex items-center space-x-4">
            <Button variant="secondary" size="sm" asChild>
              <Link to="/">
                사이트로 이동
              </Link>
            </Button>
            <Button variant="outline" size="icon">
              <Lock className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
