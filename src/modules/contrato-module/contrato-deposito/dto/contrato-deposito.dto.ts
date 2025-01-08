import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ContratoDepositoDto {

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
    ci_depositante: string;

    @ApiProperty()
    @IsNotEmpty()
    fec_deposito: string;

    @ApiProperty()
    @IsNotEmpty()
    tipo_deposito: string;

    @ApiProperty()
    descripcion: string;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

    @ApiProperty()
    estado: number;

}