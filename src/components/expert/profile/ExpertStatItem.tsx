
import React from 'react';

interface ExpertStatItemProps {
  label: string;
  value: string | number;
}

const ExpertStatItem: React.FC<ExpertStatItemProps> = ({ label, value }) => {
  return (
    <div className="bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
      <span className="block font-pretendard font-bold text-white text-center">
        {value}
      </span>
      <span className="text-xs text-white/80">{label}</span>
    </div>
  );
};

export default ExpertStatItem;
