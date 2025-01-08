import { PartialType } from '@nestjs/swagger';
import { ContratoPlanDevolucionDto } from './contrato-plan-devolucion.dto';

export class UpdateContratoPlanDevolucionDto extends PartialType(ContratoPlanDevolucionDto) {

    cod_contrato: string;
    sec: number;
    monto: number;
    fec_devolucion: string;
    razon_devolucion: string;
    tipo_devolucion: string;
    ci_devolucion: string;
    fec_mod: string;
    user_mod: string;
    estado: number;

}