import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UsuarioDto {

    @ApiProperty()
    @IsNotEmpty()
    ci: string;

    @ApiProperty()
    @IsNotEmpty()
    usuario: string;

    @ApiProperty()
    @IsNotEmpty()
    rol: string;

    @ApiProperty()
    @IsNotEmpty()
    autorizacion: number;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

    @ApiProperty()
    estado: number;

}
