import { DayProps } from '../types';

const LedButton: React.FC<DayProps> = ({ date, isCompleted, onClick }) => {
  return (
    <div className="flex flex-col items-center">
      <button
        className={`led ${isCompleted ? 'led-on' : 'led-off'}`}
        onClick={() => onClick(date)}
        aria-label={`${date.getDate()} 일 - ${isCompleted ? '완료' : '미완료'}`}
      >
        <span className="led-number">{date.getDate()}</span>
      </button>
    </div>
  );
};

export default LedButton; 