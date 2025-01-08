import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class BeneficiarioDto {

    @ApiProperty()
    @IsNotEmpty()
    ci: string;

    @ApiProperty()
    @IsNotEmpty()
    nombre_beneficiario: string;

    @ApiProperty()
    @IsNotEmpty()
    celular_beneficiario: string;

    @ApiProperty()
    @IsNotEmpty()
    ci_beneficiario: string;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

}