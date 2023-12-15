import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { baseURL, tokenRosval } from 'src/main';
import axios from 'axios';
import { Posicion } from 'src/types/posicion';

@Injectable()
export class PosicionesService {
  async findByDate(from: string): Promise<Posicion[]> {
    try {
      const response = await axios.get<Posicion[]>(
        `${baseURL}cuentas/423000005/posiciones?fecha=${from}&especie=ARS`      );
      return response.data
    } catch (error) {
      console.error(error);
      throw new HttpException('Invalid response', HttpStatus.CONFLICT);
    }
  }

  // create(createPosicioneDto: CreatePosicioneDto) {
  //   return 'This action adds a new posicione';
  // }
  // findAll() {
  //   return `This action returns all posiciones`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} posicione`;
  // }

  // update(id: number, updatePosicioneDto: UpdatePosicioneDto) {
  //   return `This action updates a #${id} posicione`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} posicione`;
  // }
}
