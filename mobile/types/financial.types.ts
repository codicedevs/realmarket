export enum financial {
  ACC = 'Acciones',
  CED = 'Cedears',
  OBG = 'Obligaciones Negociables',
  TIT = 'Títulos Públicos',
  PAG = 'Pagarés',
  MON = 'Moneda',
  ECH = "ECHEQ"
}

export interface CifrasDisponibilidad {
  dispoHoy: number;
  dispo24: number;
  dispo48: number;
  dispoHoyUsd: number;
  dispo24Usd: number;
  dispo48Usd: number
}

export interface currencyPositions {
  arsPositions: number;
  usdPrice: number;
  usdPriceBcra: number;
  posiciones: CurrencyPosition[]
}

interface movements {
  description: string;
  comprobante: string;
  date: Date;
  amount: number;
  balance: number;
}

export interface currencyMovements {
  movementsArs: movements[],
  movementsUsd: movements[]
}

export interface CurrencyPosition {
  cuenta: string;
  fecha: Date | null;
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
  parking: string | null;
}
