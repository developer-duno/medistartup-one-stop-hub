
// Utility functions for services

/**
 * Maps service titles to URL parameters for expert filtering
 */
export const getServiceUrlParam = (title: string): string => {
  const serviceMap: Record<string, string> = {
    '입지 분석': 'location-analysis',
    '재무 컨설팅': 'financial-consulting',
    '설계 및 인테리어': 'design-interior',
    '인허가 대행': 'licensing',
    '인력 채용': 'recruitment',
    '마케팅 전략': 'marketing-strategy',
    '의료기기 구입 및 설치': 'medical-equipment',
    '수납 및 의료폐기물 처리': 'waste-management'
  };
  
  return serviceMap[title] || '';
};
