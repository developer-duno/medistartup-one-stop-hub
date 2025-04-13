
import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import CustomButton from '@/components/ui/CustomButton';
import ExpertApplicationModal from './ExpertApplicationModal';

const ExpertApplicationButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CustomButton
        variant="outline"
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2"
      >
        <UserPlus className="h-4 w-4" />
        전문가 지원
      </CustomButton>
      
      <ExpertApplicationModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </>
  );
};

export default ExpertApplicationButton;
