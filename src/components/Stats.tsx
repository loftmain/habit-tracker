import { HabitData } from '../types';

interface StatsProps {
  data: HabitData;
}

const Stats: React.FC<StatsProps> = ({ data }) => {
  const calculateMonthlyStats = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const monthStart = new Date(currentYear, currentMonth, 1);
    const monthEnd = new Date(currentYear, currentMonth + 1, 0);
    
    let completed = 0;
    let total = 0;
    
    for (let d = new Date(monthStart); d <= monthEnd; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      if (data.completedDates[dateStr]) completed++;
      total++;
    }
    
    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100)
    };
  };

  const stats = calculateMonthlyStats();

  return (
    <div className="p-4 bg-gray-900 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-200">월간 통계</h2>
      <div className="space-y-2">
        <p className="text-gray-300">습관: {data.habitName}</p>
        <p className="text-gray-300">이번 달 완료: {stats.completed}/{stats.total} 일</p>
        <div className="w-full bg-gray-800 rounded-full h-2.5">
          <div
            className="bg-yellow-400 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${stats.percentage}%` }}
          />
        </div>
        <p className="text-right text-sm text-gray-400">{stats.percentage}% 달성</p>
      </div>
    </div>
  );
};

export default Stats; 