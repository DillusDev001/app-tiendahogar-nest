import { PartialType } from '@nestjs/swagger';
import { BeneficiarioDto } from './beneficiario.dto';

export class UpdateBeneficiarioDto extends PartialType(BeneficiarioDto) {

    ci: string;
    nombre_beneficiario: string;
    celular_beneficiario: string;
    ci_beneficiario: string;
    fec_mod: string;
    user_mod: string;

}