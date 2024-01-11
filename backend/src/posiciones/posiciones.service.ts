import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import axios from 'axios';
import { Posicion } from 'src/types/posicion';
import { RosvalHttpService } from 'src/rosval-http/rosval-http.service';
import { UpdatePosicioneDto } from './dto/update-posicione.dto';
import { CreatePosicioneDto } from './dto/create-posicione.dto';

@Injectable()
export class PosicionesService extends RosvalHttpService{
  
  async findByDate(from: string): Promise<Posicion[]> {
    try {
      const response = await this.http.get<Posicion[]>(
        `cuentas/423000005/posiciones?fecha=${from}&especie=ARS`      );
      return response.data
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
