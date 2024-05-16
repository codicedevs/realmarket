export function currencyFormat(number: number, currency: string): string {
  const isNegative = number < 0;
  const absoluteNumber = Math.abs(number);

  // Asigna directamente el símbolo de moneda
  const currencySymbol = '$'; // Uso directo del símbolo '$'

  // Determina el formato del número basado en su magnitud
  let displayNumber;
  if (absoluteNumber >= 1e12) { // 1 billón o más
    displayNumber = `${currencySymbol} ${(absoluteNumber / 1e12).toFixed(2)} B`;
  } else if (absoluteNumber >= 1e8) { // 100 millones o más
    displayNumber = `${currencySymbol} ${(absoluteNumber / 1e6).toFixed(2)} M`;
  } else {
    const formattedNumber = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(absoluteNumber);
    // Extrae solo los números y decimales, luego añade el símbolo '$'
    displayNumber = `${currencySymbol} ${formattedNumber.replace(/[^\d,.-]/g, '')}`;
  }

  // Agrega el signo negativo si es necesario
  if (isNegative) {
    displayNumber = `- ${displayNumber}`;
  }

  return displayNumber;
}
