import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RiesgoDto {

    @ApiProperty()
    @IsNotEmpty()
    ocupacion: string;

    @ApiProperty()
    @IsNotEmpty()
    sector: string;

    @ApiProperty()
    @IsNotEmpty()
    ingreso: number;

    @ApiProperty()
    @IsNotEmpty()
    umbral: number;

}