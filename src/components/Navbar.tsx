
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import ExpertApplicationButton from './expert/ExpertApplicationButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const getRegionsLink = () => {
    if (location.pathname === '/') {
      return '/#regions';
    }
    return '/#regions';
  };

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white bg-opacity-95 shadow-md py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="text-primary-800 font-pretendard font-bold text-xl">MediStartup</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex gap-6">
            <Link to="/services" className="font-noto text-neutral-700 hover:text-primary transition-colors">서비스</Link>
            <Link to={getRegionsLink()} className="font-noto text-neutral-700 hover:text-primary transition-colors">지역별 전문가 네트워크</Link>
            <Link to="/experts" className="font-noto text-neutral-700 hover:text-primary transition-colors">전문분야별 최고의 전문가</Link>
            <Link to="/insights" className="font-noto text-neutral-700 hover:text-primary transition-colors">뉴스 & 인사이트</Link>
            <Link to="/success-stories" className="font-noto text-neutral-700 hover:text-primary transition-colors">성공 스토리</Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              to="/#contact"
              className="bg-accent hover:bg-accent-700 text-white font-pretendard font-medium px-5 py-2 rounded-md transition-colors"
            >
              무료 상담
            </Link>
            <ExpertApplicationButton />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-neutral-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 overflow-hidden",
        isMobileMenuOpen ? "max-h-[500px]" : "max-h-0"
      )}>
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          <Link 
            to="/services" 
            className="font-noto text-neutral-700 py-2 border-b border-neutral-100"
            onClick={handleNavLinkClick}
          >
            서비스
          </Link>
          <Link 
            to={getRegionsLink()}
            className="font-noto text-neutral-700 py-2 border-b border-neutral-100"
            onClick={handleNavLinkClick}
          >
            지역별 전문가 네트워크
          </Link>
          <Link 
            to="/experts" 
            className="font-noto text-neutral-700 py-2 border-b border-neutral-100"
            onClick={handleNavLinkClick}
          >
            전문분야별 최고의 전문가
          </Link>
          <Link 
            to="/insights" 
            className="font-noto text-neutral-700 py-2 border-b border-neutral-100"
            onClick={handleNavLinkClick}
          >
            뉴스 & 인사이트
          </Link>
          <Link 
            to="/success-stories" 
            className="font-noto text-neutral-700 py-2 border-b border-neutral-100"
            onClick={handleNavLinkClick}
          >
            성공 스토리
          </Link>
          <Link 
            to="/#contact"
            className="bg-accent text-white font-pretendard font-medium px-5 py-2 rounded-md text-center"
            onClick={handleNavLinkClick}
          >
            무료 상담
          </Link>
          <ExpertApplicationButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
