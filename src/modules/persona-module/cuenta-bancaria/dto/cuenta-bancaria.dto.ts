import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CuentaBancariaDto {

    @ApiProperty()
    @IsNotEmpty()
    ci: string;

    @ApiProperty()
    @IsNotEmpty()
    banco: string;

    @ApiProperty()
    @IsNotEmpty()
    nro_cuenta: string;

    @ApiProperty()
    @IsNotEmpty()
    moneda: string;

    @ApiProperty()
    @IsNotEmpty()
    tipo_cuenta: string;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

}