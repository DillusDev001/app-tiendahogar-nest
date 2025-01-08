import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PersonaDto {

    @ApiProperty()
    @IsNotEmpty()
    ci: string;

    @ApiProperty()
    @IsNotEmpty()
    exp: string;

    @ApiProperty()
    @IsNotEmpty()
    nombres: string;

    @ApiProperty()
    @IsNotEmpty()
    apellidos: string;

    @ApiProperty()
    @IsNotEmpty()
    code: string;

    @ApiProperty()
    @IsNotEmpty()
    celular: string;

    @ApiProperty()
    @IsNotEmpty()
    nacionalidad: string;

    @ApiProperty()
    @IsNotEmpty()
    fec_nac: string;

    @ApiProperty()
    @IsNotEmpty()
    direccion: string;

    @ApiProperty()
    descripcion: string;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

}