
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Briefcase, 
  FileText, 
  Users, 
  Calculator, 
  MapPin, 
  TrendingUp, 
  Building, 
  FileCheck 
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              의료 스타트업을 위한 원스톱 허브
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl">
              의료 사업을 시작하는 데 필요한 모든 서비스를 한곳에서. 전문가 상담부터 사업 설립까지 도와드립니다.
            </p>
            <div className="space-x-4 mt-8">
              <Link to="/experts">
                <Button size="lg">전문가 찾기</Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg">서비스 둘러보기</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              제공 서비스
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl">
              의료 사업 설립과 운영에 필요한 모든 서비스를 제공합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ServiceCard
              icon={<MapPin className="h-6 w-6" />}
              title="입지 분석"
              description="최적의 위치 선정을 위한 데이터 기반 분석 서비스"
              href="/services/location"
            />
            <ServiceCard
              icon={<TrendingUp className="h-6 w-6" />}
              title="재무 컨설팅"
              description="투자 계획부터 자금 조달까지 맞춤형 재무 컨설팅"
              href="/services/financial"
            />
            <ServiceCard
              icon={<Building className="h-6 w-6" />}
              title="설계 및 인테리어"
              description="효율적인 공간 활용을 위한 맞춤형 설계 서비스"
              href="/services/design"
            />
            <ServiceCard
              icon={<FileCheck className="h-6 w-6" />}
              title="인허가 대행"
              description="복잡한 의료기관 개설 인허가 절차 원스톱 대행"
              href="/services/permit"
            />
            <ServiceCard
              icon={<Users className="h-6 w-6" />}
              title="인력 채용"
              description="전문 의료 인력 매칭 및 채용 지원 서비스"
              href="/services/recruitment"
            />
            <ServiceCard
              icon={<Briefcase className="h-6 w-6" />}
              title="마케팅 전략"
              description="의료기관 맞춤형 마케팅 전략 수립 및 실행"
              href="/services/marketing"
            />
            <ServiceCard
              icon={<FileText className="h-6 w-6" />}
              title="의료기기 구입 및 설치"
              description="최적의 의료 장비 선정 및 설치 서비스"
              href="/services/equipment"
            />
            <ServiceCard
              icon={<Calculator className="h-6 w-6" />}
              title="수납 및 의료폐기물 처리"
              description="효율적인 운영을 위한 수납 시스템 및 폐기물 처리 솔루션"
              href="/services/waste-management"
            />
          </div>
        </div>
      </section>

      {/* Expert Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              전문가 네트워크
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl">
              각 분야 최고의 전문가들이 의료 사업 성공을 위해 함께합니다.
            </p>
            <Link to="/experts">
              <Button className="mt-6">전문가 모두 보기</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                사업 시뮬레이터
              </h2>
              <p className="text-gray-500 md:text-xl">
                위치, 규모, 투자금액 등 주요 요소를 입력하여 사업 성공 가능성을 미리 확인해보세요.
              </p>
              <Link to="/simulator">
                <Button className="mt-4">시뮬레이터 사용해 보기</Button>
              </Link>
            </div>
            <div className="rounded-lg bg-gray-100 p-8">
              <h3 className="text-xl font-bold mb-4">시뮬레이션 예시</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded shadow">
                  <p className="font-medium">서울 강남구 의원급 개원</p>
                  <p className="text-sm text-gray-500">투자금액: 5억원</p>
                  <p className="text-sm text-gray-500">예상 회수 기간: 3년 6개월</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <p className="font-medium">부산 해운대구 치과 개원</p>
                  <p className="text-sm text-gray-500">투자금액: 4억원</p>
                  <p className="text-sm text-gray-500">예상 회수 기간: 4년 2개월</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              뉴스 & 인사이트
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl">
              의료 산업 트렌드와 최신 정보를 확인하세요.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>의료 스타트업 투자 동향</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  2025년 1분기 의료 스타트업 투자 동향과 주요 트렌드 분석
                </CardDescription>
                <Link to="/news/investment-trends" className="text-blue-600 hover:underline block mt-4">
                  자세히 보기
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>디지털 의료의 미래</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  AI와 디지털 기술이 가져올 의료 서비스의 혁신적 변화
                </CardDescription>
                <Link to="/news/digital-healthcare" className="text-blue-600 hover:underline block mt-4">
                  자세히 보기
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>의료법 개정안 주요 내용</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  2025년 시행 예정인 의료법 개정안의 주요 내용과 영향 분석
                </CardDescription>
                <Link to="/news/medical-law" className="text-blue-600 hover:underline block mt-4">
                  자세히 보기
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full py-12 bg-gray-900 text-gray-100">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-medium mb-4">메디스타트업 원스톱 허브</h3>
              <p className="text-sm text-gray-400">
                의료 사업을 시작하는 데 필요한 모든 서비스를 한곳에서 제공합니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">서비스</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/services/location" className="hover:underline">입지 분석</Link></li>
                <li><Link to="/services/financial" className="hover:underline">재무 컨설팅</Link></li>
                <li><Link to="/services/design" className="hover:underline">설계 및 인테리어</Link></li>
                <li><Link to="/services/permit" className="hover:underline">인허가 대행</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">회사 정보</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:underline">회사 소개</Link></li>
                <li><Link to="/contact" className="hover:underline">문의하기</Link></li>
                <li><Link to="/careers" className="hover:underline">채용 정보</Link></li>
                <li><Link to="/terms" className="hover:underline">이용약관</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">연락처</h3>
              <address className="text-sm text-gray-400 not-italic">
                서울특별시 강남구 테헤란로 123<br />
                메디스타트업 빌딩 8층<br /><br />
                <a href="tel:+82-2-1234-5678" className="hover:underline">02-1234-5678</a><br />
                <a href="mailto:info@medistartup.com" className="hover:underline">info@medistartup.com</a>
              </address>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} 메디스타트업 원스톱 허브. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ icon, title, description, href }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  href: string;
}) => {
  return (
    <Link to={href}>
      <Card className="h-full transition-all hover:shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Index;
