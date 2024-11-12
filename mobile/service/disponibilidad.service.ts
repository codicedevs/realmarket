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
            const res = await this.get(`/total-positions`)
            return res
        } catch (err) {
            console.error('Error, que mal', err.message)
        }
    }
}

export default new DisponbilidadService()