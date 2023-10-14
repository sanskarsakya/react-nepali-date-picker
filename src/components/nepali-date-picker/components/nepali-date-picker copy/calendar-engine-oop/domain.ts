// CONSTANTS
export const DATE_TYPE_ENGLISH = "ENGLISH";
export const DATE_TYPE_NEPALI = "NEPALI";
export const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
export const maxBSYear = 2100;
export const minBSYear = 1970;
export const maxADYear = maxBSYear - 57;
export const minADYear = minBSYear - 57;
export const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";


export interface IDayInfo {
  primaryDay: number;
  primaryMonth: number;
  primaryYear: number;
  secondaryDay: number;
  secondaryMonth: number;
  secondaryYear: number;
  isCurrentMonth: boolean; // required to enable current month dates
  isToday: boolean;
  isSelected: boolean;
}