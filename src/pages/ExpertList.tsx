
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Search, MapPin, Briefcase, Stethoscope, Calculator } from "lucide-react";

// 전문가 목록을 위한 가상 데이터
const experts = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    role: "재무 컨설턴트",
    profileImage: "/placeholder.svg",
    specialties: ["재무 분석", "개원 최적화", "투자 전략"],
    rating: 4.9,
    reviews: 128,
    location: "서울시 강남구",
    category: "financial"
  },
  {
    id: "2",
    name: "김준호 건축사",
    role: "의료 시설 설계 전문가",
    profileImage: "/placeholder.svg",
    specialties: ["공간 최적화", "의료 시설 설계", "인테리어"],
    rating: 4.8,
    reviews: 95,
    location: "서울시 송파구",
    category: "design"
  },
  {
    id: "3",
    name: "이미영 변호사",
    role: "의료법 전문가",
    profileImage: "/placeholder.svg",
    specialties: ["의료기관 인허가", "의료법 자문", "법적 분쟁 해결"],
    rating: 4.7,
    reviews: 112,
    location: "서울시 서초구",
    category: "permit"
  },
  {
    id: "4",
    name: "박성민 마케팅 디렉터",
    role: "의료 마케팅 전략가",
    profileImage: "/placeholder.svg",
    specialties: ["환자 유치 전략", "브랜딩", "디지털 마케팅"],
    rating: 4.6,
    reviews: 87,
    location: "서울시 마포구",
    category: "marketing"
  },
  {
    id: "5",
    name: "최영희 인사 컨설턴트",
    role: "의료 인력 채용 전문가",
    profileImage: "/placeholder.svg",
    specialties: ["인재 채용", "조직 문화", "인력 관리"],
    rating: 4.5,
    reviews: 76,
    location: "서울시 용산구",
    category: "recruitment"
  },
  {
    id: "6",
    name: "정대현 박사",
    role: "의료기기 컨설턴트",
    profileImage: "/placeholder.svg",
    specialties: ["의료장비 최적화", "구매 전략", "운영 효율화"],
    rating: 4.8,
    reviews: 92,
    location: "서울시 중구",
    category: "equipment"
  }
];

// 분야별 아이콘 매핑
const categoryIcons = {
  financial: <Calculator className="h-5 w-5" />,
  design: <Briefcase className="h-5 w-5" />,
  permit: <Stethoscope className="h-5 w-5" />,
  marketing: <Briefcase className="h-5 w-5" />,
  recruitment: <Briefcase className="h-5 w-5" />,
  equipment: <Briefcase className="h-5 w-5" />
};

export default function ExpertList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredExperts, setFilteredExperts] = useState(experts);

  // 검색 기능
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term === "") {
      setFilteredExperts(experts);
    } else {
      const filtered = experts.filter(expert => 
        expert.name.toLowerCase().includes(term.toLowerCase()) ||
        expert.role.toLowerCase().includes(term.toLowerCase()) ||
        expert.specialties.some(specialty => 
          specialty.toLowerCase().includes(term.toLowerCase())
        )
      );
      setFilteredExperts(filtered);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">전문가 네트워크</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          의료 스타트업 설립과 운영을 위한 각 분야 최고의 전문가들을 만나보세요. 
          재무 컨설팅부터 인허가 대행, 마케팅 전략까지 맞춤형 솔루션을 제공합니다.
        </p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="이름, 역할, 전문 분야로 검색"
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="financial">재무</TabsTrigger>
          <TabsTrigger value="design">설계</TabsTrigger>
          <TabsTrigger value="permit">인허가</TabsTrigger>
          <TabsTrigger value="marketing">마케팅</TabsTrigger>
          <TabsTrigger value="recruitment">인사</TabsTrigger>
          <TabsTrigger value="equipment">장비</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperts.map(expert => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        </TabsContent>
        
        {["financial", "design", "permit", "marketing", "recruitment", "equipment"].map(category => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExperts
                .filter(expert => expert.category === category)
                .map(expert => (
                  <ExpertCard key={expert.id} expert={expert} />
                ))
              }
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

interface ExpertCardProps {
  expert: {
    id: string;
    name: string;
    role: string;
    profileImage: string;
    specialties: string[];
    rating: number;
    reviews: number;
    location: string;
    category: string;
  };
}

function ExpertCard({ expert }: ExpertCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border">
            <AvatarImage src={expert.profileImage} alt={expert.name} />
            <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{expert.name}</CardTitle>
            <CardDescription className="text-base">{expert.role}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center gap-1 mb-4">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{expert.rating}</span>
          <span className="text-muted-foreground">({expert.reviews} 리뷰)</span>
        </div>
        
        <div className="flex items-start gap-2 mb-4">
          <MapPin className="h-4 w-4 mt-0.5 text-gray-500" />
          <span>{expert.location}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {expert.specialties.map((specialty, index) => (
            <Badge key={index} variant="outline">{specialty}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t">
        <Link to={`/expert/${expert.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            프로필 보기
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
