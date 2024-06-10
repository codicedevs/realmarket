import * as dayjs from 'dayjs';
type AnyDate = dayjs.Dayjs | string | Date;

export function formatRosvalDate(date: AnyDate): string {
  return dayjs(date).format('DD/MM/YYYY');
}

export function formatBcraDate(date: AnyDate): string {
  return dayjs(date).subtract(1, 'day').format('YYYY-MM-DD');
}
