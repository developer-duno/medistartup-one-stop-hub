
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { useConsultation } from '@/contexts/ConsultationContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';

interface ExpertComparisonViewProps {
  setViewMode: (mode: string) => void;
}

const ExpertComparisonView: React.FC<ExpertComparisonViewProps> = ({
  setViewMode
}) => {
  const { selectedExperts, clearSelectedExperts, getSelectedExpertsData, openConsultation } = useConsultation();
  const isMobile = useIsMobile();

  if (selectedExperts.length < 2) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-neutral-400" />
        </div>
        <h3 className="font-pretendard font-bold text-xl mb-2">전문가를 2명 이상 선택해주세요</h3>
        <p className="text-neutral-600 mb-6">
          전문가를 비교하려면 2명 이상의 전문가를 선택해야 합니다.
          그리드 보기에서 전문가를 선택한 후 비교해보세요.
        </p>
        <CustomButton 
          variant="primary"
          onClick={() => setViewMode("grid")}
        >
          그리드 보기로 돌아가기
        </CustomButton>
      </div>
    );
  }

  const selectedExpertsData = getSelectedExpertsData();

  const MobileCardView = () => (
    <div className="space-y-4">
      {selectedExpertsData.map((expert) => expert && (
        <div key={expert.id} className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex items-center gap-3 p-4 border-b border-neutral-100 bg-neutral-50">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/5 shrink-0">
              <img 
                src={expert.image || "/placeholder.svg"} 
                alt={expert.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
              />
            </div>
            <div>
              <h4 className="font-pretendard font-bold text-base">{expert.name}</h4>
              <p className="text-sm text-muted-foreground">{expert.role}</p>
            </div>
          </div>
          
          <div className="divide-y divide-neutral-100">
            <div className="px-4 py-3">
              <span className="text-xs font-medium text-muted-foreground">전문 서비스</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {expert.services.map((service, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{service}</Badge>
                ))}
              </div>
            </div>
            
            <div className="px-4 py-3 flex justify-between">
              <div>
                <span className="text-xs font-medium text-muted-foreground">경력</span>
                <p className="text-sm mt-0.5">{expert.experience}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-medium text-muted-foreground">프로젝트</span>
                <p className="text-sm mt-0.5">{expert.projects}</p>
              </div>
            </div>
            
            <div className="px-4 py-3">
              <span className="text-xs font-medium text-muted-foreground">활동 지역</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {expert.regions.map((region, i) => (
                  <Badge key={i} variant="outline" className="text-xs">{region}</Badge>
                ))}
              </div>
            </div>
            
            <div className="px-4 py-3">
              <span className="text-xs font-medium text-muted-foreground">소개</span>
              <p className="text-sm mt-1 text-foreground/80 line-clamp-3">{expert.description}</p>
            </div>
            
            <div className="px-4 py-3">
              <Link 
                to={`/expert/${expert.id}`}
                className="text-primary hover:text-primary/80 text-sm font-medium"
              >
                상세 프로필 보기 →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const DesktopTableView = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500 uppercase tracking-wider w-1/4">
                비교 항목
              </th>
              {selectedExpertsData.map((expert) => expert && (
                <th key={expert.id} className="px-6 py-4 text-left text-sm font-medium text-neutral-500 uppercase tracking-wider">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/5">
                      <img 
                        src={expert.image || "/placeholder.svg"} 
                        alt={expert.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
                      />
                    </div>
                    <span>{expert.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">전문 분야</td>
              {selectedExpertsData.map((expert) => expert && (
                <td key={expert.id} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{expert.role}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">전문 서비스</td>
              {selectedExpertsData.map((expert) => expert && (
                <td key={expert.id} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{expert.services.join(', ')}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">경력</td>
              {selectedExpertsData.map((expert) => expert && (
                <td key={expert.id} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{expert.experience}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">프로젝트 수</td>
              {selectedExpertsData.map((expert) => expert && (
                <td key={expert.id} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{expert.projects}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">활동 지역</td>
              {selectedExpertsData.map((expert) => expert && (
                <td key={expert.id} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{expert.regions.join(', ')}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">소개</td>
              {selectedExpertsData.map((expert) => expert && (
                <td key={expert.id} className="px-6 py-4 text-sm text-neutral-700">
                  <p className="max-w-xs">{expert.description}</p>
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">상세 프로필</td>
              {selectedExpertsData.map((expert) => expert && (
                <td key={expert.id} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                  <Link 
                    to={`/expert/${expert.id}`}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    상세 보기
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      {isMobile ? <MobileCardView /> : <DesktopTableView />}
      
      <div className={`flex justify-center gap-4 mt-8 ${isMobile ? 'flex-col' : ''}`}>
        <CustomButton 
          variant="outline"
          onClick={clearSelectedExperts}
          fullWidth={isMobile}
        >
          선택 초기화
        </CustomButton>
        
        <CustomButton 
          variant="primary"
          onClick={openConsultation}
          fullWidth={isMobile}
        >
          선택한 전문가에게 상담 신청
        </CustomButton>
        
        <CustomButton 
          variant="secondary"
          onClick={() => setViewMode("grid")}
          fullWidth={isMobile}
        >
          그리드 보기로 돌아가기
        </CustomButton>
      </div>
    </div>
  );
};

export default ExpertComparisonView;
