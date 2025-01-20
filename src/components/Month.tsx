import { MonthProps } from '../types';
import LedButton from './LedButton';
import { formatDate } from '../utils/localStorage';

const Month: React.FC<MonthProps> = ({ month, year, completedDates, onToggleDate }) => {
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const days = Array.from(
    { length: getDaysInMonth(month, year) },
    (_, i) => new Date(year, month, i + 1)
  );

  return (
    <div className="flex flex-col items-center gap-2">
      {days.map((date) => (
        <LedButton
          key={date.toString()}
          date={date}
          isCompleted={!!completedDates[formatDate(date)]}
          onClick={onToggleDate}
        />
      ))}
    </div>
  );
};

export default Month; 