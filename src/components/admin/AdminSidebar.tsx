
import React from 'react';
import { Users, Settings, FileText, BarChart3, Home, MapPin, Trophy } from 'lucide-react';

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeSection, setActiveSection }) => {
  const sidebarItems = [
    { 
      id: 'dashboard', 
      label: '대시보드 홈', 
      icon: <Home className="h-5 w-5" /> 
    },
    { 
      id: 'experts', 
      label: '전문가 관리', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      id: 'services', 
      label: '서비스 관리', 
      icon: <Settings className="h-5 w-5" /> 
    },
    { 
      id: 'insights', 
      label: '뉴스 & 인사이트', 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      id: 'simulator', 
      label: '시뮬레이터 관리', 
      icon: <BarChart3 className="h-5 w-5" /> 
    },
    { 
      id: 'regions', 
      label: '지역별 데스크', 
      icon: <MapPin className="h-5 w-5" /> 
    },
    { 
      id: 'success', 
      label: '성공사례 관리', 
      icon: <Trophy className="h-5 w-5" /> 
    },
  ];

  return (
    <aside className="md:w-64 bg-white rounded-lg shadow-md p-4">
      <div className="mb-6">
        <h2 className="font-pretendard font-bold text-lg text-primary mb-2">메디스타트업</h2>
        <p className="text-xs text-gray-500">관리자 시스템</p>
      </div>
      <nav>
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <button
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                  activeSection === item.id
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
