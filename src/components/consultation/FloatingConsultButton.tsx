
import React, { useState, useEffect } from 'react';
import { MessageCircle, CheckCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useConsultation } from '@/domains/consultation/context';
import { cn } from '@/lib/utils';

const FloatingConsultButton: React.FC = () => {
  const { selectedExperts, openConsultation } = useConsultation();
  const location = useLocation();
  const isExpertProfile = /^\/experts\/\d+/.test(location.pathname);
  const isExpertList = location.pathname === '/experts';
  
  const hasSelectedExperts = selectedExperts.length > 0;
  
  // Hide on scroll down, show on scroll up
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  return (
    <div 
      className={cn(
        "fixed right-6 z-40 transition-all duration-300 transform",
        isExpertProfile ? "bottom-20 lg:bottom-6" : "bottom-6",
        isExpertList && hasSelectedExperts ? "hidden md:block" : "",
        hasSelectedExperts ? "scale-110" : "scale-100",
        visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      )}
    >
      <button
        onClick={openConsultation}
        className={cn(
          "relative shadow-lg p-4 flex items-center gap-2 group transition-all rounded-full",
          hasSelectedExperts 
            ? "bg-accent hover:bg-accent-700 text-white" 
            : "bg-primary hover:bg-primary-700 text-white"
        )}
      >
        {hasSelectedExperts && (
          <span className="absolute right-full top-1/2 transform -translate-y-1/2 -translate-x-2 bg-white text-accent text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-sm">
            {selectedExperts.length}
          </span>
        )}
        {hasSelectedExperts ? (
          <CheckCircle className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
        <span className="font-pretendard font-medium opacity-0 max-w-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 whitespace-nowrap overflow-hidden">
          {hasSelectedExperts ? '선택된 전문가' : '무료 상담'}
        </span>
      </button>
    </div>
  );
};

export default FloatingConsultButton;
