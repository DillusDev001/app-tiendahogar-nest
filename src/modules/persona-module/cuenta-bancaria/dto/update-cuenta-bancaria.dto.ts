import { PartialType } from '@nestjs/swagger';
import { CuentaBancariaDto } from './cuenta-bancaria.dto';

export class UpdateCuentaBancariaDto extends PartialType(CuentaBancariaDto) {

    ci: string;
    banco: string;
    nro_cuenta: string;
    moneda: string;
    tipo_cuenta: string;
    fec_mod: string;
    user_mod: string;

}