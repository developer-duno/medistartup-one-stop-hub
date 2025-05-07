
import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { toast } from 'sonner';

interface RegionSelectorProps {
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  regions: string[];
  isLoading?: boolean;
  onAnalysisClick?: () => void;
  showAnalysisButton?: boolean;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({
  selectedRegion,
  setSelectedRegion,
  regions,
  isLoading = false,
  onAnalysisClick,
  showAnalysisButton = true
}) => {
  const handleDropdownToggle = () => {
    const dropdown = document.getElementById('regionDropdown');
    if (dropdown) {
      dropdown.classList.toggle('hidden');
    }
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    const dropdown = document.getElementById('regionDropdown');
    if (dropdown) {
      dropdown.classList.add('hidden');
    }
  };

  const handleFeasibilityAnalysis = () => {
    if (!selectedRegion) {
      toast.error('지역을 선택해 주세요');
      return;
    }

    if (onAnalysisClick) {
      onAnalysisClick();
    }
  };

  return (
    <div className="relative inline-block">
      <div className="flex">
        <div className="relative z-10 w-fit">
          <button 
            className="flex items-center gap-2 px-4 py-2 font-noto bg-white border border-neutral-200 rounded-l-md shadow-sm"
            onClick={handleDropdownToggle}
          >
            <MapPin size={18} className="text-primary" />
            <span>{selectedRegion}</span>
            <ChevronDown size={16} className="text-neutral-400" />
          </button>
          <div 
            id="regionDropdown"
            className="absolute left-0 top-full mt-1 w-full bg-white border border-neutral-200 rounded-md shadow-md hidden z-20"
          >
            {regions.map((region) => (
              <div 
                key={region}
                className="px-4 py-2 cursor-pointer hover:bg-neutral-100 font-noto"
                onClick={() => handleRegionSelect(region)}
              >
                {region}
              </div>
            ))}
          </div>
        </div>
        
        {showAnalysisButton && (
          <CustomButton 
            variant="accent" 
            size="lg"
            className="rounded-l-none"
            onClick={handleFeasibilityAnalysis}
            disabled={isLoading}
          >
            {isLoading ? '분석 중...' : '무료 타당성 분석 받기'}
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default RegionSelector;
