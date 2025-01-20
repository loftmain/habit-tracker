import { useState, useEffect, useRef } from 'react';
import Month from './components/Month';
import Stats from './components/Stats';
import { HabitData } from './types';
import { loadFromLocalStorage, saveToLocalStorage, formatDate } from './utils/localStorage';

function App() {
  const [habitData, setHabitData] = useState<HabitData>(() => {
    return (
      loadFromLocalStorage() || {
        habitName: '매일 10분 운동하기',
        completedDates: {},
      }
    );
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    saveToLocalStorage(habitData);
  }, [habitData]);

  const handleToggleDate = (date: Date) => {
    const dateStr = formatDate(date);
    setHabitData((prev) => ({
      ...prev,
      completedDates: {
        ...prev.completedDates,
        [dateStr]: !prev.completedDates[dateStr],
      },
    }));
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(habitData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'habit-tracker-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as HabitData;
        setHabitData(data);
      } catch (error) {
        alert('유효하지 않은 파일입니다.');
      }
    };
    reader.readAsText(file);
  };

  const months = Array.from({ length: 12 }, (_, i) => i);
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">습관 추적기</h1>
          <div className="space-x-4">
            <button
              onClick={handleExportData}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded"
            >
              데이터 내보내기
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded"
            >
              데이터 가져오기
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportData}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>
        
        <div className="mb-8">
          <Stats data={habitData} />
        </div>

        <div className="flex justify-between items-start overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-full">
            {months.map((month) => (
              <div key={month} className="flex flex-col items-center">
                <h3 className="text-sm font-medium mb-4 text-gray-400">
                  {new Date(currentYear, month).toLocaleString('ko-KR', { month: 'short' })}
                </h3>
                <Month
                  month={month}
                  year={currentYear}
                  completedDates={habitData.completedDates}
                  onToggleDate={handleToggleDate}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
