
import React from 'react';
import { Region } from './types';
import { useRegions } from '@/contexts/RegionsContext';

interface MapSvgProps {
  regions: Region[];
  activeRegion: string;
  setActiveRegion: (name: string) => void;
}

const MapSvg: React.FC<MapSvgProps> = ({ regions, activeRegion, setActiveRegion }) => {
  const { getRegionalExpertCount } = useRegions();
  
  return (
    <div className="relative bg-white rounded-xl shadow-md p-4 h-[400px] md:h-[500px]">
      <svg 
        viewBox="0 0 400 450" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {regions.map((region) => (
          <g key={region.id} onClick={() => setActiveRegion(region.name)}>
            <path 
              d={region.path}
              className={`${activeRegion === region.name ? 'fill-primary/30' : 'fill-blue-50'} stroke-primary stroke-2 cursor-pointer transition-all duration-300`}
            />
            <text 
              x={region.labelX} 
              y={region.labelY}
              textAnchor="middle"
              className={`${activeRegion === region.name ? 'fill-primary font-bold' : 'fill-neutral-700'} text-sm cursor-pointer pointer-events-none transition-all`}
            >
              {region.name}
            </text>
            <text 
              x={region.labelX} 
              y={region.labelY + 16}
              textAnchor="middle"
              className={`${activeRegion === region.name ? 'opacity-100' : 'opacity-70'} fill-primary text-xs font-medium cursor-pointer`}
            >
              {region.expertCount !== undefined ? region.expertCount : getRegionalExpertCount(region.name)}명의 전문가
            </text>
            {/* 활성화된 지역에 표시할 하이라이트 원 */}
            {activeRegion === region.name && (
              <circle 
                cx={region.labelX} 
                cy={region.labelY - 20} 
                r="8"
                className="fill-primary animate-pulse"
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default MapSvg;
