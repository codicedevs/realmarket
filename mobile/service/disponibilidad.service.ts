// import HttpService from "./http.service";
import { HttpService } from "./http.service";

export class DisponbilidadService extends HttpService {
    constructor() {
        super("posiciones")
    }

   async getCashPositions ()  {
    return this.get(`/cash-position-by-dates`)
   }

   async totalPositions() {
    return this.get(`/total-position`)
   }
}

export default new DisponbilidadService()