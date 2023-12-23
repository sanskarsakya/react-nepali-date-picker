// migrated
import { BSToAD } from 'bikram-sambat-js';
import * as from_domains from '../../domains';
import dayjs from 'dayjs';

/**
 * ALWAYS RETURNS ENGLISH DATE
 */
export const get_normalized_date = (date: any, dateType: any) => {
  try {
    if (dateType === from_domains.DATE_TYPE_ENGLISH) {
      return dayjs(date).format('YYYY-MM-DD');
    }

    return dayjs(BSToAD(date)).format('YYYY-MM-DD');
  } catch (error) {
    console.log(error);
  }
};
