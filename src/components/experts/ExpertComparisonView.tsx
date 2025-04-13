
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { useConsultation } from '@/contexts/ConsultationContext';

interface ExpertComparisonViewProps {
  setViewMode: (mode: string) => void;
}

const ExpertComparisonView: React.FC<ExpertComparisonViewProps> = ({
  setViewMode
}) => {
  const { selectedExperts, clearSelectedExperts, getSelectedExpertsData, openConsultation } = useConsultation();

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

  return (
    <div>
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
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={expert.image} 
                          alt={expert.name}
                          className="w-full h-full object-cover"
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">
                  전문 분야
                </td>
                {selectedExpertsData.map((expert) => expert && (
                  <td key={expert.id} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                    {expert.role}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">
                  전문 서비스
                </td>
                {selectedExpertsData.map((expert) => expert && (
                  <td key={expert.id} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                    {expert.services.join(', ')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">
                  경력
                </td>
                {selectedExpertsData.map((expert) => expert && (
                  <td key={expert.id} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                    {expert.experience}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">
                  프로젝트 수
                </td>
                {selectedExpertsData.map((expert) => expert && (
                  <td key={expert.id} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                    {expert.projects}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">
                  활동 지역
                </td>
                {selectedExpertsData.map((expert) => expert && (
                  <td key={expert.id} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                    {expert.regions.join(', ')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">
                  소개
                </td>
                {selectedExpertsData.map((expert) => expert && (
                  <td key={expert.id} className="px-6 py-4 text-sm text-neutral-700">
                    <p className="max-w-xs">{expert.description}</p>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">
                  상세 프로필
                </td>
                {selectedExpertsData.map((expert) => expert && (
                  <td key={expert.id} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                    <Link 
                      to={`/expert/${expert.id}`}
                      className="text-primary hover:text-primary-700 font-medium"
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
      
      <div className="flex justify-center gap-4">
        <CustomButton 
          variant="outline"
          onClick={clearSelectedExperts}
        >
          선택 초기화
        </CustomButton>
        
        <CustomButton 
          variant="primary"
          onClick={openConsultation}
        >
          선택한 전문가에게 상담 신청
        </CustomButton>
        
        <CustomButton 
          variant="secondary"
          onClick={() => setViewMode("grid")}
        >
          그리드 보기로 돌아가기
        </CustomButton>
      </div>
    </div>
  );
};

export default ExpertComparisonView;
