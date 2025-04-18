
/**
 * SEO 최적화를 위한 유틸리티 함수
 */

// 페이지별 기본 타이틀 설정
export const getPageTitle = (pageTitle?: string): string => {
  const baseTitle = '메디스타트업';
  return pageTitle ? `${pageTitle} | ${baseTitle}` : `${baseTitle} - 병원창업 원스톱 허브`;
};

// 페이지별 메타 설명 생성
export const getMetaDescription = (path: string): string => {
  const descriptions: Record<string, string> = {
    '/': '병원창업 전문지식과 경험을 한 곳에서. 의료인을 위한 맞춤형 창업 컨설팅 서비스.',
    '/services': '병원 창업을 위한 전문 서비스. 입지분석부터 운영까지 전문가의 도움을 받으세요.',
    '/experts': '병원창업에 필요한 각 분야 전문가들을 만나보세요. 풍부한 경력과 성공 사례를 바탕으로 최적의 솔루션을 제공합니다.',
    '/insights': '병원창업에 관한 최신 인사이트와 전문 정보를 제공합니다.',
    '/success-stories': '메디스타트업과 함께 성공적인 병원창업 사례를 확인하세요.'
  };
  
  return descriptions[path] || descriptions['/'];
};

// 페이지별 키워드 생성
export const getMetaKeywords = (path: string): string => {
  const baseKeywords = '병원창업, 의료기관 설립, 병원컨설팅, 의사창업';
  
  const pageKeywords: Record<string, string> = {
    '/services': '병원서비스, 입지분석, 재무컨설팅, 인테리어, 인허가, 의료장비',
    '/experts': '병원창업전문가, 병원컨설턴트, 의료컨설팅, 의료전문가',
    '/insights': '병원창업정보, 의료트렌드, 병원경영, 의료마케팅',
    '/success-stories': '병원성공사례, 병원창업후기, 의료기관성공'
  };
  
  return pageKeywords[path] 
    ? `${baseKeywords}, ${pageKeywords[path]}` 
    : baseKeywords;
};

// 동적 메타 태그 설정 함수 (React Helmet 등의 라이브러리와 함께 사용)
export const getSEOData = (path: string, customTitle?: string) => {
  return {
    title: getPageTitle(customTitle),
    description: getMetaDescription(path),
    keywords: getMetaKeywords(path),
    canonicalUrl: `https://medistartup.kr${path}`
  };
};
