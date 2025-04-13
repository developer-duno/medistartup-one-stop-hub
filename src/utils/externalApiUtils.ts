
import { InsightType } from '@/components/admin/insights/types';

export interface ApiConfig {
  url: string;
  mappings?: {
    title?: string;
    excerpt?: string;
    content?: string;
    category?: string;
    author?: string;
    date?: string;
    image?: string;
    views?: string;
  }
}

/**
 * Fetches insights data from an external API
 * @param config API configuration
 * @returns Promise with fetched and formatted insights
 */
export const fetchExternalInsights = async (config: ApiConfig): Promise<InsightType[]> => {
  const response = await fetch(config.url);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  
  const data = await response.json();
  const items = Array.isArray(data) ? data : (data.items || data.results || data.data || []);
  
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('API 응답이 유효한 배열 형식이 아닙니다.');
  }
  
  // Default field mappings
  const mappings = {
    title: 'title',
    excerpt: 'excerpt',
    content: 'content',
    category: 'category',
    author: 'author',
    date: 'date',
    image: 'image',
    views: 'views',
    ...config.mappings
  };
  
  // Process and format the data according to our InsightType
  return items.map((item: any, index: number) => {
    // Helper function to get value from possibly nested paths
    const getValue = (obj: any, path: string) => {
      // Handle nested paths with dot notation (e.g. 'data.image.url')
      const keys = path.split('.');
      return keys.reduce((a, b) => (a && a[b] !== undefined ? a[b] : undefined), obj);
    };
    
    // Try different possible field names based on mapping
    const getField = (fieldMappings: string[], defaultValue: string) => {
      for (const mapping of fieldMappings) {
        const value = getValue(item, mapping);
        if (value !== undefined && value !== null) return value;
      }
      return defaultValue;
    };
    
    // Generate an ID for the new insight
    const id = index + 1;
    
    // Extract all required fields with fallbacks
    return {
      id,
      title: getField([mappings.title, 'headline', 'name'], '제목 없음'),
      excerpt: getField([mappings.excerpt, 'description', 'summary', 'subtitle'], '요약 없음'),
      content: getField([mappings.content, 'body', 'text', 'article'], '내용 없음'),
      category: getField([mappings.category, 'type', 'section', 'topic'], 'trend'),
      author: getField([mappings.author, 'writer', 'creator', 'publisher'], '작성자 미상'),
      date: getField([mappings.date, 'publishedAt', 'created', 'published'], new Date().toISOString().split('T')[0]),
      image: getField([mappings.image, 'thumbnail', 'imageUrl', 'coverImage', 'featured_image'], 'https://placehold.co/600x400?text=No+Image'),
      views: parseInt(getField([mappings.views, 'viewCount', 'reads'], '0')) || 0
    };
  });
};

/**
 * Example API configurations for common content APIs
 */
export const predefinedApiConfigs: Record<string, ApiConfig> = {
  wordpress: {
    url: 'https://example.com/wp-json/wp/v2/posts?_embed',
    mappings: {
      title: 'title.rendered',
      content: 'content.rendered',
      excerpt: 'excerpt.rendered',
      date: 'date',
      author: 'author_name',
      image: '_embedded.wp:featuredmedia.0.source_url'
    }
  },
  contentful: {
    url: 'https://cdn.contentful.com/spaces/YOUR_SPACE_ID/environments/master/entries?content_type=article&access_token=YOUR_ACCESS_TOKEN',
    mappings: {
      title: 'fields.title',
      content: 'fields.body',
      excerpt: 'fields.summary',
      date: 'fields.publishDate',
      author: 'fields.author.fields.name',
      image: 'fields.heroImage.fields.file.url'
    }
  },
  strapi: {
    url: 'https://your-strapi-api.com/api/articles',
    mappings: {
      title: 'attributes.title',
      content: 'attributes.content',
      excerpt: 'attributes.summary',
      date: 'attributes.publishedAt',
      author: 'attributes.author.data.attributes.name',
      image: 'attributes.image.data.attributes.url'
    }
  }
};
