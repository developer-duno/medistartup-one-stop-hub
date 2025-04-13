
import { InsightType } from '@/components/admin/insights/types';

// Get category display name
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

// Map categories from our data structure to UI tabs
export const getCategoryType = (category: string): 'news' | 'trends' => {
  switch(category) {
    case 'licensing':
    case 'finance':
    case 'recruitment':
      return 'news';
    case 'trend':
    case 'marketing':
    case 'equipment':
      return 'trends';
    default:
      return 'trends';
  }
};

// Filter insights based on active tab and search query
export const filterInsights = (
  insights: InsightType[],
  activeTab: 'all' | 'news' | 'trends',
  searchQuery: string
): InsightType[] => {
  return insights.filter(insight => {
    // Filter by tab
    if (activeTab !== 'all' && getCategoryType(insight.category) !== activeTab) return false;
    
    // Filter by search
    if (searchQuery && !insight.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !insight.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
};

// Get all unique tags from insights
export const getAllTags = (insights: InsightType[]): string[] => {
  return [...new Set(insights.map(insight => getCategoryDisplayName(insight.category)))];
};
