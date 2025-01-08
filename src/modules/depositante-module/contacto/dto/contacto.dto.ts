import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ContactoDto {

    @ApiProperty()
    @IsNotEmpty()
    ci: string;

    @ApiProperty()
    @IsNotEmpty()
    nombre_contacto: string;

    @ApiProperty()
    @IsNotEmpty()
    celular_contacto: string;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;


}