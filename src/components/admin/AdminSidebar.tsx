
import React from 'react';
import { Users, Settings, FileText, BarChart3 } from 'lucide-react';

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeSection, setActiveSection }) => {
  const sidebarItems = [
    { id: 'experts', label: '전문가 관리', icon: <Users className="h-5 w-5" /> },
    { id: 'services', label: '서비스 관리', icon: <Settings className="h-5 w-5" /> },
    { id: 'insights', label: '뉴스 & 인사이트', icon: <FileText className="h-5 w-5" /> },
    { id: 'simulator', label: '시뮬레이터 관리', icon: <BarChart3 className="h-5 w-5" /> },
  ];

  return (
    <aside className="md:w-64 bg-white rounded-lg shadow-md p-4">
      <nav>
        <ul className="space-y-2">
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
