import { PartialType } from '@nestjs/swagger';
import { AsesorDto } from './asesor.dto';

export class UpdateAsesorDto extends PartialType(AsesorDto) {

    ci: string;
    fec_ingreso: string;
    antiguedad: number;
    fec_mod: string;
    user_mod: string;
    estado: number;

}
