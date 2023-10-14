import { ADToBS, BSToAD } from 'bikram-sambat-js';
import dayjs from 'dayjs';
import { DATE_TYPE_ENGLISH } from './domain';

export const utilities = {
  zero_pad: (num: number): string => `${num > 9 ? num : '0' + num}`,
  stitch_date: (date: any, separator = '-'): string => {
    return `${date.year}${separator}${utilities.zero_pad(
      date.month,
    )}${separator}${utilities.zero_pad(date.day)}`;
  },
  ADToBS: (englishDate: Date) => {
    try {
      return ADToBS(englishDate);
    } catch (error) {
      console.log('Error converting ad to bs: do nothing');
    }
  },
  BSToAD: (nepaliDate: string) => {
    try {
      return BSToAD(nepaliDate);
    } catch (error) {
      console.log('Error converting bs to ad: do nothing');
    }
  },
  is_today: (date: Date) => {
    const currentDate = dayjs();
    const providedDate = dayjs(date);
    return providedDate.isSame(currentDate, 'day');
  },
  get_normalized_date: (date: any, dateType: any) => {
    if (dateType === DATE_TYPE_ENGLISH) {
      return dayjs(date).format('YYYY-MM-DD');
    }

    return dayjs(utilities.BSToAD(date)).format('YYYY-MM-DD');
  },
};
