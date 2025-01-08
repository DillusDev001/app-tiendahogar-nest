import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ContratoGrupoDto {

    @ApiProperty()
    @IsNotEmpty()
    cod_contrato: string;

    @ApiProperty()
    @IsNotEmpty()
    ci: string;

    @ApiProperty()
    @IsNotEmpty()
    sec: number;

    @ApiProperty()
    @IsNotEmpty()
    rol: string;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

    @ApiProperty()
    estado: number;

}