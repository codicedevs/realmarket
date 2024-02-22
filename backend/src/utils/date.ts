import * as dayjs from 'dayjs';
type AnyDate = dayjs.Dayjs | string | Date;

export function formatRosvalDate(date: AnyDate): string {
  return dayjs(date).format('DD/MM/YYYY');
}
