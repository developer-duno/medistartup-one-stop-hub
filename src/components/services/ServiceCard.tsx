
import React from 'react';
import { Link } from 'react-router-dom';
import { Service } from '@/types/service';

interface ServiceCardProps {
  service: Service;
  getServiceUrlParam: (title: string) => string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, getServiceUrlParam }) => {
  return (
    <Link
      key={service.id}
      to={service.path}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="p-6 border-b border-neutral-100">
        <div className="flex items-start gap-4 mb-4">
          <div className="theme-bg-light rounded-lg w-12 h-12 flex items-center justify-center shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="theme-text"
            >
              {service.icon === 'MapPin' && <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />}
              {service.icon === 'MapPin' && <circle cx="12" cy="10" r="3" />}
              {service.icon === 'BarChart3' && <path d="M3 3v18h18" />}
              {service.icon === 'BarChart3' && <path d="M18 17V9" />}
              {service.icon === 'BarChart3' && <path d="M13 17V5" />}
              {service.icon === 'BarChart3' && <path d="M8 17v-3" />}
              {service.icon === 'Building2' && <path d="M6 22V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v19" />}
              {service.icon === 'Building2' && <path d="M6 12h14" />}
              {service.icon === 'Building2' && <path d="M6 22h14" />}
              {service.icon === 'FileCheck' && <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />}
              {service.icon === 'FileCheck' && <polyline points="14 2 14 8 20 8" />}
              {service.icon === 'FileCheck' && <path d="m9 15 2 2 4-4" />}
              {service.icon === 'Users' && <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />}
              {service.icon === 'Users' && <circle cx="9" cy="7" r="4" />}
              {service.icon === 'Users' && <path d="M22 21v-2a4 4 0 0 1 0 7.75" />}
              {service.icon === 'Users' && <path d="M16 3.13a4 4 0 0 1 0 7.75" />}
              {service.icon === 'Briefcase' && <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />}
              {service.icon === 'Briefcase' && <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />}
              {service.icon === 'Package' && <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />}
              {service.icon === 'Package' && <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />}
              {service.icon === 'Package' && <path d="M12 3v6" />}
              {service.icon === 'Trash2' && <path d="M3 6h18" />}
              {service.icon === 'Trash2' && <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />}
              {service.icon === 'Trash2' && <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />}
              {service.icon === 'Trash2' && <path d="M10 11v6" />}
              {service.icon === 'Trash2' && <path d="M14 11v6" />}
            </svg>
          </div>
          <h3 className="font-pretendard font-bold text-xl text-neutral-900">{service.title}</h3>
        </div>
        <p className="font-noto text-neutral-600 mb-4">{service.description}</p>
      </div>
      <div className="p-4 bg-neutral-50 flex justify-between items-center group-hover:theme-bg-light transition-colors">
        <span className="font-pretendard font-medium theme-text inline-flex items-center">
          자세히 보기
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1 transition-transform group-hover:translate-x-1"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </span>
        <Link 
          to={`/experts?service=${getServiceUrlParam(service.title)}`}
          onClick={(e) => e.stopPropagation()}
          className="text-sm theme-text hover:underline"
        >
          전문가 찾기
        </Link>
      </div>
    </Link>
  );
};

export default ServiceCard;
