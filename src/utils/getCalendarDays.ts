import { addDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export const getCalendarDays = (mode: 'week' | 'month'): Date[] => {
  const currentDate = new Date();

  if (mode === 'month') {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  } else {
    const daysAroundCurrent = 3;
    const start = addDays(currentDate, -daysAroundCurrent);
    const end = addDays(currentDate, daysAroundCurrent);
    return eachDayOfInterval({ start, end });
  }
};
