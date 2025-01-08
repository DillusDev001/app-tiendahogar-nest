import { PartialType } from '@nestjs/swagger';
import { ContactoDto } from './contacto.dto';

export class UpdateContactoDto extends PartialType(ContactoDto) {
    
    ci: string;
    nombre_contacto: string;
    celular_contacto: string;
    fec_mod: string;
    user_mod: string;

}