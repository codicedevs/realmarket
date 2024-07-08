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
  usdPositions: number
}