import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ContratoPlanDevolucionDto {

    @ApiProperty()
    @IsNotEmpty()
    cod_contrato: string;

    @ApiProperty()
    @IsNotEmpty()
    sec: number;

    @ApiProperty()
    @IsNotEmpty()
    monto: number;

    @ApiProperty()
    @IsNotEmpty()
    fec_devolucion: string;

    @ApiProperty()
    @IsNotEmpty()
    razon_devolucion: string;

    @ApiProperty()
    @IsNotEmpty()
    tipo_devolucion: string;

    @ApiProperty()
    @IsNotEmpty()
    ci_devolucion: string;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

    @ApiProperty()
    estado: number;

}