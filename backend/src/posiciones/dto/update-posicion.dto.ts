import { PartialType } from '@nestjs/mapped-types';
import { CreatePosicioneDto } from './create-posicion.dto';

export class UpdatePosicioneDto extends PartialType(CreatePosicioneDto) {}
