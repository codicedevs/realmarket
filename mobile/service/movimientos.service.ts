// import HttpService from "./http.service";
import { HttpService } from "./http.service";

export class MovimientosService extends HttpService {
    constructor() {
        super("movimientos")
    }

   async getMovementsArs() {
    return this.get(`/pesos`)
   }
}

export default new MovimientosService()