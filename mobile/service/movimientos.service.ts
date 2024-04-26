// import HttpService from "./http.service";
import { arrayBufferToBase64 } from "../utils/buffer";
import { HttpService } from "./http.service";

export class MovimientosService extends HttpService {
    constructor() {
        super("movimientos")
    }

    async getMovementsArs() {
        return this.get(`/pesos`)
    }

    async getMovementsUsd() {
        return this.get('/usd')
    }

    /**
     * 
     * @param id de tipo string, es la id del receipt 
     * @returns devuelve el archivo jpg/pdf en una cadena de texto en forma base64
     */
    async getReceipt(id: string) {{
        const res = await this.get(`comprobante/${id}`, {responseType: 'arraybuffer'})
        return arrayBufferToBase64(res.data)
    }}
}

export default new MovimientosService()