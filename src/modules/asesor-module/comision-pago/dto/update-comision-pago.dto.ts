import { PartialType } from '@nestjs/swagger';
import { ComisionPagoDto } from './comision-pago.dto';

export class UpdateComisionPagoDto extends PartialType(ComisionPagoDto) {

    cod_contrato: string;
    ci_asesor: string;
    monto: number;
    moneda: string;
    fec_pago: string;
    tipo_pago: string;
    fec_mod: string;
    user_mod: string;
    estado: number;

}