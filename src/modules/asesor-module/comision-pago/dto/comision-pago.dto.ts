import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ComisionPagoDto {

    @ApiProperty()
    @IsNotEmpty()
    cod_contrato: string;

    @ApiProperty()
    @IsNotEmpty()
    ci_asesor: string;

    @ApiProperty()
    @IsNotEmpty()
    monto: number;

    @ApiProperty()
    @IsNotEmpty()
    moneda: string;

    @ApiProperty()
    @IsNotEmpty()
    fec_pago: string;

    @ApiProperty()
    @IsNotEmpty()
    tipo_pago: string;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

    @ApiProperty()
    estado: number;

}