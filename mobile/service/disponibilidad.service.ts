// import HttpService from "./http.service";
import { HttpService } from "./http.service";

export class DisponbilidadService extends HttpService {
    constructor() {
        super("posiciones")
    }

    async getCashPositions() {
        try {

            return this.get(`/cash-position-by-dates`)
        } catch (err) {
            console.error('Error, que mal loco', err.message)
        }
    }

    async totalPositions() {
        try {
            // const res = await this.get(`/total-positions`)
            return {
                data: {
                    "totalPosiciones": -3183845107.358088,
                    "usdPrice": 1014.5,
                    "usdPriceBcra": 995.3333,
                    "posiciones": [
                        {
                            "cuenta": "423000005",
                            "fecha": "08/11/2024",
                            "tipoTitulo": "Moneda",
                            "tipoTituloAgente": "",
                            "codigoISIN": "",
                            "especie": "ARS",
                            "nombreEspecie": "Peso",
                            "simboloLocal": "Peso",
                            "lugar": "Local",
                            "subCuenta": "GRAL",
                            "estado": "DIS",
                            "informacion": "ARS",
                            "cantidadLiquidada": "-76091417.67",
                            "cantidadPendienteLiquidar": "0",
                            "precio": "1",
                            "precioUnitario": "1",
                            "monedaCotizacion": "ARS",
                            "fechaPrecio": "08/11/2024",
                            "parking": null
                        },
                        {
                            "cuenta": "423000005",
                            "fecha": "08/11/2024",
                            "tipoTitulo": "Acciones",
                            "tipoTituloAgente": "",
                            "codigoISIN": "ARP331091024",
                            "especie": "00274",
                            "nombreEspecie": "CRESUD S.A. ORD. 1 VOTO ESCRIT.",
                            "simboloLocal": "CRES",
                            "lugar": "CV",
                            "subCuenta": "CVCUS",
                            "estado": "DIS",
                            "informacion": "[00274] CRES - CRESUD S.A. ORD. 1 VOTO ESCRIT.",
                            "cantidadLiquidada": '-4050',
                            "cantidadPendienteLiquidar": 0,
                            "precio": "1185",
                            "precioUnitario": "1185",
                            "monedaCotizacion": "ARS",
                            "fechaPrecio": "07/11/2024",
                            "parking": null
                        },
                        {
                            "cuenta": "423000005",
                            "fecha": "08/11/2024",
                            "tipoTitulo": "Acciones",
                            "tipoTituloAgente": "",
                            "codigoISIN": "ARP2354W1188",
                            "especie": "00322",
                            "nombreEspecie": "CENTRAL PUERTO S.A. ESCRIT. B 1 VOTO",
                            "simboloLocal": "CEPU",
                            "lugar": "CV",
                            "subCuenta": "CVCUS",
                            "estado": "DIS",
                            "informacion": "[00322] CEPU - CENTRAL PUERTO S.A. ESCRIT. B 1 VOTO",
                            "cantidadLiquidada": "-989",
                            "cantidadPendienteLiquidar": "0",
                            "precio": "1405",
                            "precioUnitario": "1405",
                            "monedaCotizacion": "ARS",
                            "fechaPrecio": "07/11/2024",
                            "parking": null
                        },
                    ]
                }
            }
        } catch (err) {
            console.error('Error, que mal', err.message)
        }
    }
}

export default new DisponbilidadService()