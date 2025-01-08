import { PartialType } from '@nestjs/swagger';
import { RiesgoDto } from './riesgo.dto';

export class UpdateRiesgoDto extends PartialType(RiesgoDto) {

    ocupacion: string;
    sector: string;
    ingreso: number;
    umbral: number;

}