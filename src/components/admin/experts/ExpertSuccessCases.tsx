
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Minus } from 'lucide-react';

interface ExpertSuccessCasesProps {
  successCases: Array<{
    title: string;
    description: string;
    image?: string;
    results: string[];
  }>;
  setSuccessCases: React.Dispatch<React.SetStateAction<Array<{
    title: string;
    description: string;
    image?: string;
    results: string[];
  }>>>;
}

const ExpertSuccessCases: React.FC<ExpertSuccessCasesProps> = ({ 
  successCases, 
  setSuccessCases 
}) => {
  // Add a new case
  const addCase = () => {
    setSuccessCases([...successCases, { 
      title: '', 
      description: '', 
      image: '',
      results: [''] 
    }]);
  };
  
  // Remove a case
  const removeCase = (index: number) => {
    setSuccessCases(successCases.filter((_, i) => i !== index));
  };
  
  // Update case field
  const updateCaseField = (caseIndex: number, field: string, value: string) => {
    const updated = [...successCases];
    updated[caseIndex] = { ...updated[caseIndex], [field]: value };
    setSuccessCases(updated);
  };
  
  // Add a result to a case
  const addResult = (caseIndex: number) => {
    const updated = [...successCases];
    updated[caseIndex].results = [...updated[caseIndex].results, ''];
    setSuccessCases(updated);
  };
  
  // Remove a result from a case
  const removeResult = (caseIndex: number, resultIndex: number) => {
    const updated = [...successCases];
    updated[caseIndex].results = updated[caseIndex].results.filter((_, i) => i !== resultIndex);
    setSuccessCases(updated);
  };
  
  // Update a result
  const updateResult = (caseIndex: number, resultIndex: number, value: string) => {
    const updated = [...successCases];
    updated[caseIndex].results[resultIndex] = value;
    setSuccessCases(updated);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <FormLabel className="text-base">성공 사례</FormLabel>
      </div>
      
      {successCases.length === 0 ? (
        <div className="text-center p-6 border border-dashed rounded-md">
          <p className="text-muted-foreground mb-4">성공 사례를 추가해 주세요</p>
          <Button 
            type="button" 
            variant="outline" 
            onClick={addCase}
          >
            <Plus className="h-4 w-4 mr-2" />
            성공 사례 추가
          </Button>
        </div>
      ) : (
        <>
          {successCases.map((caseItem, caseIndex) => (
            <div key={caseIndex} className="mb-6 border rounded-md p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">사례 {caseIndex + 1}</h4>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeCase(caseIndex)}
                >
                  <Minus className="h-4 w-4 mr-1" />
                  삭제
                </Button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <FormLabel className="text-sm">제목</FormLabel>
                  <Input 
                    placeholder="사례 제목" 
                    value={caseItem.title} 
                    onChange={(e) => updateCaseField(caseIndex, 'title', e.target.value)}
                  />
                </div>
                
                <div>
                  <FormLabel className="text-sm">설명</FormLabel>
                  <Textarea 
                    placeholder="사례 설명" 
                    value={caseItem.description} 
                    onChange={(e) => updateCaseField(caseIndex, 'description', e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div>
                  <FormLabel className="text-sm">이미지 URL</FormLabel>
                  <Input 
                    placeholder="https://example.com/image.jpg" 
                    value={caseItem.image || ''} 
                    onChange={(e) => updateCaseField(caseIndex, 'image', e.target.value)}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <FormLabel className="text-sm">성과</FormLabel>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => addResult(caseIndex)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      성과 추가
                    </Button>
                  </div>
                  
                  {caseItem.results.map((result, resultIndex) => (
                    <div key={resultIndex} className="flex items-center gap-2 mb-2">
                      <Input 
                        placeholder={`성과 ${resultIndex + 1}`} 
                        value={result} 
                        onChange={(e) => updateResult(caseIndex, resultIndex, e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={() => removeResult(caseIndex, resultIndex)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          <Button 
            type="button" 
            variant="outline" 
            onClick={addCase}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            성공 사례 추가
          </Button>
        </>
      )}
    </div>
  );
};

export default ExpertSuccessCases;
