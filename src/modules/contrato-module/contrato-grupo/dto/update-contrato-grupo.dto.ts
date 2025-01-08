import { PartialType } from '@nestjs/swagger';
import { ContratoGrupoDto } from './contrato-grupo.dto';

export class UpdateContratoGrupoDto extends PartialType(ContratoGrupoDto) {

    cod_contrato: string;
    ci: string;
    sec: number;
    rol: string;
    fec_mod: string;
    user_mod: string;
    estado: number;

}