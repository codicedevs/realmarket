import { Injectable } from '@nestjs/common';

import { RosvalHttpService } from 'src/rosval-http/rosval-http.service';
import { Posicion } from 'src/types/posicion';

@Injectable()
export class PosicionesService extends RosvalHttpService {
  async findByDate(accountId: string, from: string): Promise<Posicion[]> {
    const response = await this.http.get<Posicion[]>(
      `cuentas/${accountId}/posiciones?fecha=${from}&tipoTitulo=Acciones`,
    );
    return response.data;
  }
}
