import { PartialType } from '@nestjs/swagger';
import { UsuarioDto } from './usuario.dto';

export class UpdateUsuarioDto extends PartialType(UsuarioDto) {

    ci: string;
    usuario: string;
    rol: string;
    autorizacion: number;
    fec_mod: string;
    user_mod: string;
    estado: number;

}
