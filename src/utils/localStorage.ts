import { HabitData } from '../types';

const STORAGE_KEY = 'habit-tracker-data';

export const saveToLocalStorage = (data: HabitData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadFromLocalStorage = (): HabitData | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  
  try {
    return JSON.parse(data) as HabitData;
  } catch {
    return null;
  }
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
}; 