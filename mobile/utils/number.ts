export function currencyFormat(number: number, currency: string): string {
  const isNegative = number < 0;
  const absoluteNumber = Math.abs(number);

  // Asigna directamente el símbolo de moneda basado en la moneda proporcionada
  const currencySymbol = currency === "ARS" ? '$' : 'USD'; // Uso directo del símbolo '$'

  // Formatea el número utilizando Intl.NumberFormat
  const formattedNumber = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(absoluteNumber);

  // Extrae solo los números y decimales, luego añade el símbolo '$'
  let displayNumber = `${currencySymbol} ${formattedNumber.replace(/[^\d,.-]/g, '')}`;

  // Agrega el signo negativo si es necesario
  if (isNegative) {
    displayNumber = `- ${displayNumber}`;
  }
  return displayNumber;
}
