
import React from 'react';
import { Users, Settings, FileText, BarChart3, MapPin, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QuickLinkCard from './QuickLinkCard';

interface QuickLinksProps {
  title: string;
}

const QuickLinks = ({ title }: QuickLinksProps) => {
  const navigate = useNavigate();

  const quickLinks = [
    { title: '전문가 추가', icon: <Users className="h-5 w-5" />, section: 'experts' },
    { title: '서비스 관리', icon: <Settings className="h-5 w-5" />, section: 'services' },
    { title: '인사이트 추가', icon: <FileText className="h-5 w-5" />, section: 'insights' },
    { title: '시뮬레이터 수정', icon: <BarChart3 className="h-5 w-5" />, section: 'simulator' },
    { title: '지역 데스크 관리', icon: <MapPin className="h-5 w-5" />, section: 'regions' },
    { title: '성공사례 추가', icon: <Trophy className="h-5 w-5" />, section: 'success' }
  ];

  const handleQuickLink = (section: string) => {
    navigate(`/admin?section=${section}`);
  };

  return (
    <div>
      <h3 className="font-pretendard font-semibold text-xl mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {quickLinks.map((link, index) => (
          <QuickLinkCard 
            key={index}
            title={link.title}
            icon={link.icon}
            onClick={() => handleQuickLink(link.section)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
