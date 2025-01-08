import { PartialType } from '@nestjs/swagger';
import { DepositanteDto } from './depositante.dto';

export class UpdateDepositanteDto extends PartialType(DepositanteDto) {

    ci: string;
    ocupacion: string;
    sector: string;
    nota: string;
    fec_mod: string;
    user_mod: string;
    estado: number;

}