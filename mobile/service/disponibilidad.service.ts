// import HttpService from "./http.service";
import { HttpService } from "./http.service";

export class DisponbilidadService extends HttpService {
    constructor() {
        super("posiciones")
    }

   async getCashPositions ()  {
    return this.get(`/cash-position-by-dates`)
   }
}

export default new DisponbilidadService()