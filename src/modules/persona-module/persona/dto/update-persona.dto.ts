import { PartialType } from '@nestjs/swagger';
import { PersonaDto } from './persona.dto';

export class UpdatePersonaDto extends PartialType(PersonaDto) {

    ci: string;
    exp: string;
    nombres: string;
    apellidos: string;
    code: string;
    celular: string;
    nacionalidad: string;
    fec_nac: string;
    direccion: string;
    descripcion: string;
    fec_mod: string;
    user_mod: string;

}
