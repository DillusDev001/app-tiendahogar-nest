import { PartialType } from '@nestjs/swagger';
import { TipoCambioDto } from './tipo-cambio.dto';

export class UpdateTipoCambioDto extends PartialType(TipoCambioDto) {

    moneda: string;
    compra: number;
    venta: number;
    fec_mod: string;
    user_mod: string;
    estado: number;

}
