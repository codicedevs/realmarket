export class Posicion {
  cuenta: string;
  fecha: string;
  tipoTitulo: string;
  tipoTituloAgente: string;
  codigoISIN: string;
  especie: string;
  nombreEspecie: string;
  simboloLocal: string;
  lugar: string;
  subCuenta: string;
  estado: string;
  cantidadLiquidada: number;
  cantidadPendienteLiquidar: number;
  precio: number;
  precioUnitario: number;
  monedaCotizacion: string;
  fechaPrecio: string;
  parking: null | object; // El tipo 'any' puede ser reemplazado con un tipo más específico si es necesario
}
