import { PartialType } from '@nestjs/swagger';
import { ComisionDto } from './comision.dto';

export class UpdateComisionDto extends PartialType(ComisionDto) {

    id_comision: number;
    antiguedad: number;
    min_anios: number;
    max_anios: number;
    comision: number;
    fec_mod: string;
    user_mod: string;

}
