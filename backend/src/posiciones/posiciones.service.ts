import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { RosvalHttpService } from 'src/rosval-http/rosval-http.service';
import { Posicion } from 'src/types/posicion';
import { CreatePosicioneDto } from './dto/create-posicione.dto';
import { UpdatePosicioneDto } from './dto/update-posicione.dto';

@Injectable()
export class PosicionesService extends RosvalHttpService {
  async findByDate(accountId: string, from: string): Promise<Posicion[]> {
    try {
      const response = await this.get<Posicion[]>(
        `cuentas/${accountId}/posiciones?fecha=${from}&tipoTitulo=Acciones`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new HttpException('Invalid response', HttpStatus.CONFLICT);
    }
  }

  create(createPosicioneDto: CreatePosicioneDto) {
    return 'This action adds a new posicione';
  }
  findAll() {
    return `This action returns all posiciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} posicione`;
  }

  update(id: number, updatePosicioneDto: UpdatePosicioneDto) {
    return `This action updates a #${id} posicione`;
  }

  remove(id: number) {
    return `This action removes a #${id} posicione`;
  }
}
