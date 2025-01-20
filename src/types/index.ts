export interface HabitData {
  habitName: string;
  completedDates: { [key: string]: boolean };
}

export interface DayProps {
  date: Date;
  isCompleted: boolean;
  onClick: (date: Date) => void;
}

export interface MonthProps {
  month: number;
  year: number;
  completedDates: { [key: string]: boolean };
  onToggleDate: (date: Date) => void;
} 