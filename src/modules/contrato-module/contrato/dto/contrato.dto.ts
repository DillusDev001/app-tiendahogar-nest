import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ContratoDto {

    @ApiProperty()
    @IsNotEmpty()
    cod_contrato: string;

    @ApiProperty()
    @IsNotEmpty()
    anio: number;

    @ApiProperty()
    @IsNotEmpty()
    sec: number;

    @ApiProperty()
    @IsNotEmpty()
    fec_crea: string;

    @ApiProperty()
    @IsNotEmpty()
    id_paquete: number;

    @ApiProperty()
    @IsNotEmpty()
    monto_capital: number;

    @ApiProperty()
    @IsNotEmpty()
    tipo_contrato: string;

    @ApiProperty()
    @IsNotEmpty()
    grupal_individual: string;

    @ApiProperty()
    @IsNotEmpty()
    nombre_grupo: string;

    @ApiProperty()
    @IsNotEmpty()
    reinversion: string;

    @ApiProperty()
    @IsNotEmpty()
    cod_contrato_anterior: string;

    @ApiProperty()
    @IsNotEmpty()
    periodo_devolucion: string;

    @ApiProperty()
    @IsNotEmpty()
    ci_asesor: string;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

    @ApiProperty()
    estado: number;


}