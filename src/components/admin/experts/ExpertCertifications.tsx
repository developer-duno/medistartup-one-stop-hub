
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface ExpertCertificationsProps {
  certifications: string[];
  setCertifications: (certifications: string[]) => void;
}

const ExpertCertifications: React.FC<ExpertCertificationsProps> = ({ 
  certifications, 
  setCertifications 
}) => {
  const addCertificationField = () => {
    setCertifications([...certifications, '']);
  };
  
  const removeCertificationField = (index: number) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
  };
  
  const handleCertificationChange = (index: number, value: string) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = value;
    setCertifications(updatedCertifications);
  };

  return (
    <div>
      <FormLabel>자격증 및 수료</FormLabel>
      {certifications.map((cert, index) => (
        <div key={index} className="flex items-center gap-2 mt-2">
          <Input
            placeholder={`자격증 ${index + 1}`}
            value={cert}
            onChange={(e) => handleCertificationChange(index, e.target.value)}
            className="flex-1"
          />
          {index > 0 && (
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              onClick={() => removeCertificationField(index)}
            >
              <Minus className="h-4 w-4" />
            </Button>
          )}
          {index === certifications.length - 1 && (
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              onClick={addCertificationField}
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpertCertifications;
