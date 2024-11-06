import Realm from "realm";

export class Movimiento extends Realm.Object {
  static schema = {
    name: "Movimiento",
    primaryKey: undefined,
    properties: {
      description: "string",
      date: "string",
      amount: "float",
      balance: "float",
      comprobante: "string"
    },
  };
}

export class ContainerUsd extends Realm.Object {
  static schema = {
    name: "ContainerUsd",
    primaryKey: "id",
    properties: {
      id: "uuid",
      movimientos: "Movimiento[]", // Lista de movimientos
    },
  };
}

export class ContainerArs extends Realm.Object {
  static schema = {
    name: "ContainerArs",
    primaryKey: "id",
    properties: {
      id: "uuid",
      movimientos: "Movimiento[]", // Lista de movimientos
    },
  };
}

export class Position extends Realm.Object {
  _id;
  totalPosiciones;
  usdPrice;
  usdPriceBcra;
  posiciones;
  static primaryKey = "_id";
  static schema = {
    name: "Position",
    primaryKey: "_id",
    properties: {
      _id: 'uuid',
      totalPosiciones: "string",
      usdPrice: "string",
      usdPriceBcra: "string",
      posiciones: 'PositionDetail[]',
    },
  };
}

export class PositionDetail extends Realm.Object {
  cuenta;
  fecha;
  tipoTitulo;
  tipoTituloAgente;
  codigoISIN;
  especie;
  nombreEspecie;
  simboloLocal;
  lugar;
  subCuenta;
  estado;
  cantidadLiquidada;
  cantidadPendienteLiquidar;
  precio;
  precioUnitario;
  monedaCotizacion;
  fechaPrecio;
  parking;
  static schema = {
    name: "PositionDetail",
    properties: {
      cuenta: "string?",
      fecha: "date?",
      tipoTitulo: "string?",
      tipoTituloAgente: "string?",
      codigoISIN: "string?",
      especie: "string?",
      nombreEspecie: "string?",
      simboloLocal: "string?",
      lugar: "string?",
      subCuenta: "string?",
      estado: "string?",
      cantidadLiquidada: "float?",
      cantidadPendienteLiquidar: "float?",
      precio: "float?",
      precioUnitario: "float?",
      monedaCotizacion: "string?",
      fechaPrecio: "string?",
      parking: "string?",
    },
  };
}