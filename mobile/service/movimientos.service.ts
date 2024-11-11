// import HttpService from "./http.service";
import { arrayBufferToBase64 } from "../utils/buffer";
import { HttpService } from "./http.service";

export class MovimientosService extends HttpService {
    constructor() {
        super("movimientos")
    }

    async getMovementsArs() {
        try {

            const res = await this.get(`/pesos`)
            return res
        } catch (err) {
            console.error('Error, que mal 2', err.message)
        }
    }

    async getMovementsUsd() {
        return this.get('/usd')
    }

    /**
     * 
     * @param id de tipo string, es la id del receipt 
     * @returns devuelve el archivo jpg/pdf en una cadena de texto en forma base64
     */
    async getReceipt(id: string) {
        {
            const res = await this.get(`comprobante/${id}`, { responseType: 'arraybuffer' })
            return arrayBufferToBase64(res.data)
        }
    }
}

export default new MovimientosService()