
import React from 'react';

interface StaffMember {
  role: string;
  count: number;
  salary: number;
}

interface StaffingResultsProps {
  result: {
    staffing: StaffMember[];
    monthlyCost: string;
  };
}

const StaffingResults: React.FC<StaffingResultsProps> = ({ result }) => {
  return (
    <div className="grid gap-4">
      <h3 className="font-bold text-xl">시뮬레이션 결과</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left">직책</th>
              <th className="border p-2 text-left">필요 인원</th>
              <th className="border p-2 text-left">예상 월급 (1인)</th>
              <th className="border p-2 text-left">총 비용</th>
            </tr>
          </thead>
          <tbody>
            {result.staffing.map((staff, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border p-2">{staff.role}</td>
                <td className="border p-2">{staff.count}명</td>
                <td className="border p-2">{staff.salary}만원</td>
                <td className="border p-2">{staff.count * staff.salary}만원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-primary/10 rounded-lg mt-2">
        <p className="text-sm text-gray-500">총 인건비 (월)</p>
        <p className="text-2xl font-bold">{result.monthlyCost}</p>
      </div>
    </div>
  );
};

export default StaffingResults;
