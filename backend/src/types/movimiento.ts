//TODO: Deberíamos moverlo a movimientos/interfaces/movimiento.interface.ts
export interface Movimiento {
  cuenta: string;
  fechaDesde: string;
  fechaHasta: string;
  tipoTitulo: string | null;
  tipoTituloAgente: string | null;
  especie: string;
  simboloLocal: string;
  lugar: string;
  estado: string;
  fecha: string;
  tipoOperacion: string | null;
  comprobante: string;
  informacion: string;
  subCuenta: string;
  cantidad: number;
  tipoEspecie: string | null;
  movimiento: string;
}

// export enum Estado {
//   ACTIVO= "Activo",
//   INACTIVO= "Inactivo",

// }
