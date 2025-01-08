import { PartialType } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

export class UpdateAuthDto extends PartialType(AuthDto) {

    usuario: string;
    password: string;
    pregunta: string;
    respuesta: string;
    fec_mod: string;
    user_mod: string;

}