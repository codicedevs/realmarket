
// export function currencyFormat(number: number, currency: string): string {
//   const newNumber = number * 1
//   return new Intl.NumberFormat('es-AR', {
//     style: 'currency',
//     currency: currency,
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2
//   }).format(newNumber);
// }

export function currencyFormat(number: number, currency: string): string {
  const isNegative = number < 0;
  const absoluteNumber = Math.abs(number);

  let formattedNumber = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(absoluteNumber);

  if (isNegative) {
    const currencySymbol = formattedNumber.match(/^\D+/)[0];
    const numericPart = formattedNumber.slice(currencySymbol.length);
    formattedNumber = `${currencySymbol}- ${numericPart}`;
  }

  return formattedNumber;
}