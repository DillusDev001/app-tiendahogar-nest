import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PaqueteDto {

    @ApiProperty()
    id_paquete: number;

    @ApiProperty()
    @IsNotEmpty()
    paquete: string;

    @ApiProperty()
    @IsNotEmpty()
    descripcion: string;

    @ApiProperty()
    @IsNotEmpty()
    tipo_contrato: string;

    @ApiProperty()
    @IsNotEmpty()
    monto_min: number;

    @ApiProperty()
    @IsNotEmpty()
    monto_max: number;

    @ApiProperty()
    @IsNotEmpty()
    interes: number;

    @ApiProperty()
    @IsNotEmpty()
    plazo: number;

    @ApiProperty()
    @IsNotEmpty()
    moneda: string;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

    @ApiProperty()
    estado: number;

}
