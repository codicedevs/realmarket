
export function currencyFormat (number: string | number): string {

  return number.toLocaleString('es', { style: 'currency', currency: 'ARS' });
   
}