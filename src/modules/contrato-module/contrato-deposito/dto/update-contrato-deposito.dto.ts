import { PartialType } from '@nestjs/swagger';
import { ContratoDepositoDto } from './contrato-deposito.dto';

export class UpdateContratoDepositoDto extends PartialType(ContratoDepositoDto) {

    cod_contrato: string;
    sec: number;
    monto: number;
    ci_depositante: string;
    fec_deposito: string;
    tipo_deposito: string;
    descripcion: string;
    fec_mod: string;
    user_mod: string;
    estado: number;

}