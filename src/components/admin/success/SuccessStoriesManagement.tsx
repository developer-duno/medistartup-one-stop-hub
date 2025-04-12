
import React from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SuccessStory {
  id: number;
  title: string;
  hospital: string;
  location: string;
  services: string[];
  date: string;
  imageUrl: string;
  featured: boolean;
}

const SuccessStoriesManagement = () => {
  const successStories: SuccessStory[] = [
    {
      id: 1,
      title: '서울 강남구 피부과 성공적 개원',
      hospital: '미소피부과의원',
      location: '서울 강남',
      services: ['입지 분석', '인테리어', '마케팅'],
      date: '2023-03-15',
      imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop',
      featured: true
    },
    {
      id: 2,
      title: '대전 둔산동 소아과 리모델링',
      hospital: '행복소아과의원',
      location: '대전 서구',
      services: ['인테리어', '의료기기'],
      date: '2023-02-10',
      imageUrl: 'https://images.unsplash.com/photo-1629909614088-7dd6c3197533?q=80&w=2069&auto=format&fit=crop',
      featured: false
    },
    {
      id: 3,
      title: '부산 해운대 치과 개원 컨설팅',
      hospital: '스마일치과의원',
      location: '부산 해운대',
      services: ['재무 컨설팅', '인력 채용'],
      date: '2023-01-22',
      imageUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1974&auto=format&fit=crop',
      featured: true
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-pretendard font-bold text-2xl">성공사례 관리</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          성공사례 추가
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium text-muted-foreground">제목</th>
                <th className="text-left p-4 font-medium text-muted-foreground">의료기관</th>
                <th className="text-left p-4 font-medium text-muted-foreground">지역</th>
                <th className="text-left p-4 font-medium text-muted-foreground">서비스</th>
                <th className="text-left p-4 font-medium text-muted-foreground">등록일</th>
                <th className="text-left p-4 font-medium text-muted-foreground">상태</th>
                <th className="text-right p-4 font-medium text-muted-foreground">관리</th>
              </tr>
            </thead>
            <tbody>
              {successStories.map((story) => (
                <tr key={story.id} className="border-b">
                  <td className="p-4">
                    <div className="flex items-center">
                      <img 
                        src={story.imageUrl} 
                        className="w-12 h-8 rounded object-cover mr-3" 
                        alt={story.title} 
                      />
                      {story.title}
                    </div>
                  </td>
                  <td className="p-4">{story.hospital}</td>
                  <td className="p-4">{story.location}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {story.services.map((service, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">{story.date}</td>
                  <td className="p-4">
                    {story.featured ? 
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">메인 노출</span> :
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">일반</span>
                    }
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-900">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessStoriesManagement;
