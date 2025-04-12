
import React from 'react';

const ExpertEmptyTableRow: React.FC = () => {
  return (
    <tr>
      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
        등록된 전문가가 없습니다.
      </td>
    </tr>
  );
};

export default ExpertEmptyTableRow;
