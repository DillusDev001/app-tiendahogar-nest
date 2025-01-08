import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class TipoCambioDto {

    @ApiProperty()
    @IsNotEmpty()
    moneda: string;

    @ApiProperty()
    @IsNotEmpty()
    compra: number;

    @ApiProperty()
    @IsNotEmpty()
    venta: number;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

    @ApiProperty()
    estado: number;

}
