// export function currencyFormat(number: number, currency: string): string {
//   const isNegative = number < 0;
//   const absoluteNumber = Math.abs(number);

//   // Obtiene el símbolo de la moneda usando Intl.NumberFormat
//   const currencySymbol = new Intl.NumberFormat('es-AR', {
//     style: 'currency',
//     currency: currency,
//     minimumFractionDigits: 0
//   }).formatToParts(0).find(part => part.type === 'currency').value;

//   // Determina el formato del número basado en su magnitud
//   let displayNumber;
//   if (absoluteNumber >= 1e12) { // 1 billón o más
//     displayNumber = `${currencySymbol} ${(absoluteNumber / 1e12).toFixed(2)} B`;
//   } else if (absoluteNumber >= 1e8) { // 100 millones o más
//     displayNumber = `${currencySymbol} ${(absoluteNumber / 1e6).toFixed(2)} M`;
//   } else {
//     displayNumber = new Intl.NumberFormat('es-AR', {
//       style: 'currency',
//       currency: currency,
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     }).format(absoluteNumber);
//   }

//   // Agrega el signo negativo si es necesario
//   if (isNegative) {
//     displayNumber = `- ${displayNumber}`;
//   }

//   return displayNumber;
// }

export function currencyFormat(number: number, currency: string): string {
  const isNegative = number < 0;
  const absoluteNumber = Math.abs(number);

  // Obtiene el símbolo de la moneda
  let currencySymbol = '';
  try {
    const formatter = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    });
    currencySymbol = formatter.format(0).replace(/\d/g, '').trim();
  } catch (error) {
    console.error('Error al obtener el símbolo de la moneda:', error);
  }

  // Determina el formato del número basado en su magnitud
  let displayNumber;
  if (absoluteNumber >= 1e12) { // 1 billón o más
    displayNumber = `${currencySymbol} ${(absoluteNumber / 1e12).toFixed(2)} B`;
  } else if (absoluteNumber >= 1e8) { // 100 millones o más
    displayNumber = `${currencySymbol} ${(absoluteNumber / 1e6).toFixed(2)} M`;
  } else {
    displayNumber = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(absoluteNumber);
  }

  // Agrega el signo negativo si es necesario
  if (isNegative) {
    displayNumber = `- ${displayNumber}`;
  }

  return displayNumber;
}
