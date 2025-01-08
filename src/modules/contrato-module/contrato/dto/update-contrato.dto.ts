import { PartialType } from '@nestjs/swagger';
import { ContratoDto } from './contrato.dto';

export class UpdateContratoDto extends PartialType(ContratoDto) {

    cod_contrato: string;
    anio: number;
    sec: number;
    fec_crea: string;
    id_paquete: number;
    monto_capital: number;
    tipo_contrato: string;
    grupal_individual: string;
    nombre_grupo: string;
    reinversion: string;
    cod_contrato_anterior: string;
    periodo_devolucion: string;
    ci_asesor: string;
    fec_mod: string;
    user_mod: string;
    estado: number;

}