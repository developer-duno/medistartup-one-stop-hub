
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  onRefresh: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onRefresh }) => {
  return (
    <div className="text-center py-10 border rounded-lg p-6 max-w-xl mx-auto bg-gray-50">
      <AlertCircle className="h-10 w-10 text-amber-500 mx-auto mb-4" />
      <h3 className="text-lg font-medium mb-2">활성화된 시뮬레이터가 없습니다</h3>
      <p className="text-neutral-500 mb-6">
        현재 활성화된 시뮬레이터가 없습니다. 관리자 페이지에서 시뮬레이터를 추가하거나 활성화해주세요.
      </p>
      <button 
        onClick={onRefresh}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
      >
        새로고침
      </button>
    </div>
  );
};

export default EmptyState;
