export interface Schedule {
  day: string;
  hours: string;
}

export interface TimeInterval {
  open: string;
  close: string;
}

export interface DaySchedule {
  day: string;
  label: string;
  isOpen: boolean;
  intervals: TimeInterval[];
}