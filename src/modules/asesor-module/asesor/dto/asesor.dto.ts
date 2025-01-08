import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AsesorDto {

    @ApiProperty()
    @IsNotEmpty()
    ci: string;

    @ApiProperty()
    @IsNotEmpty()
    fec_ingreso: string;

    @ApiProperty()
    @IsNotEmpty()
    antiguedad: number;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

    @ApiProperty()
    estado: number;


}
