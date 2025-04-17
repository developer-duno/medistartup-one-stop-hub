
/**
 * SEO 최적화를 위한 유틸리티 함수
 */

// 페이지별 기본 타이틀 설정
export const getPageTitle = (pageTitle?: string): string => {
  const baseTitle = '메디스타트업';
  return pageTitle ? `${pageTitle} | ${baseTitle}` : `${baseTitle} - 병원창업 원스톱 허브`;
};

// 페이지별 메타 설명 생성
export const getMetaDescription = (path: string, customDescription?: string): string => {
  if (customDescription) return customDescription;
  
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
export const getMetaKeywords = (path: string, customKeywords?: string): string => {
  const baseKeywords = '병원창업, 의료기관 설립, 병원컨설팅, 의사창업';
  
  if (customKeywords) return `${baseKeywords}, ${customKeywords}`;
  
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

// 인사이트 SEO 데이터 생성
export const getInsightSEOData = (insight: any) => {
  return {
    title: getPageTitle(insight.title),
    description: insight.excerpt || `${insight.title} - 병원창업에 관한 최신 인사이트와 전문 정보를 제공합니다.`,
    keywords: `${getMetaKeywords('/insights')}, ${insight.category}, ${getCategoryDisplayName(insight.category)}`,
    canonicalUrl: `https://medistartup.kr/insights/${insight.id}`,
    ogImage: insight.image || 'https://medistartup.kr/opengraph-image.jpg'
  };
};

// 성공 스토리 SEO 데이터 생성
export const getSuccessStorySEOData = (story: any) => {
  return {
    title: getPageTitle(`${story.title} - ${story.hospital} 성공사례`),
    description: story.summary || `${story.title} - ${story.hospital}의 성공 스토리를 확인하세요.`,
    keywords: `${getMetaKeywords('/success-stories')}, ${story.hospital}, ${story.location}, ${story.services.join(', ')}`,
    canonicalUrl: `https://medistartup.kr/success-stories/${story.id}`,
    ogImage: story.imageUrl || 'https://medistartup.kr/opengraph-image.jpg'
  };
};

// 전문가 프로필 SEO 데이터 생성
export const getExpertSEOData = (expert: any) => {
  const expertKeywords = [
    expert.name,
    expert.title,
    expert.specialty,
    ...(expert.regions || []),
    ...(expert.services || [])
  ].filter(Boolean).join(', ');
  
  return {
    title: getPageTitle(`${expert.name} - ${expert.title}`),
    description: expert.description || `${expert.name} - ${expert.specialty} 분야 전문가의 프로필을 확인하세요. 경력, 전문 분야, 성공 사례를 소개합니다.`,
    keywords: `${getMetaKeywords('/experts')}, ${expertKeywords}`,
    canonicalUrl: `https://medistartup.kr/experts/${expert.id}`,
    ogImage: expert.image || 'https://medistartup.kr/opengraph-image.jpg'
  };
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

// 카테고리 표시 이름 생성 (insights를 위한 유틸리티에서 이동)
export const getCategoryDisplayName = (category: string): string => {
  switch (category) {
    case 'trend': return '트렌드';
    case 'marketing': return '마케팅';
    case 'licensing': return '인허가';
    case 'finance': return '재무';
    case 'recruitment': return '인력채용';
    case 'equipment': return '의료장비';
    default: return category;
  }
};
