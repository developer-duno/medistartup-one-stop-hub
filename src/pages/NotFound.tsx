
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout hideFooter={false}>
      <Helmet>
        <title>페이지를 찾을 수 없습니다 | 메디스타트업</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center max-w-md px-4">
          <h1 className="text-5xl font-bold text-primary mb-6">404</h1>
          <p className="text-2xl font-medium text-gray-800 mb-4">페이지를 찾을 수 없습니다</p>
          <p className="text-gray-600 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-200"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
