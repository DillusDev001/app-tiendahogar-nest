import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ComisionDto {

    @ApiProperty()
    id_comision: number;

    @ApiProperty()
    @IsNotEmpty()
    antiguedad: number;

    @ApiProperty()
    @IsNotEmpty()
    min_anios: number;

    @ApiProperty()
    @IsNotEmpty()
    max_anios: number;

    @ApiProperty()
    @IsNotEmpty()
    comision: number;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

}