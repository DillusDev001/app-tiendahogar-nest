import { PartialType } from '@nestjs/swagger';
import { PaqueteDto } from './paquete.dto';

export class UpdatePaqueteDto extends PartialType(PaqueteDto) {

    id_paquete: number;
    paquete: string;
    descripcion: string;
    tipo_contrato: string;
    monto_min: number;
    monto_max: number;
    interes: number;
    plazo: number;
    moneda: string;
    fec_mod: string;
    user_mod: string;
    estado: number;

}