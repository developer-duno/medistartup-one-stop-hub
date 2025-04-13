
import React from 'react';
import { Separator } from '@/components/ui/separator';

interface ViewsCounterProps {
  views: number;
}

const ViewsCounter: React.FC<ViewsCounterProps> = ({ views }) => {
  return (
    <>
      <Separator className="mb-4" />
      <div className="text-sm text-muted-foreground">
        <p>이 시뮬레이션은 현재까지 <strong>{views || 0}회</strong> 실행되었습니다.</p>
      </div>
    </>
  );
};

export default ViewsCounter;
