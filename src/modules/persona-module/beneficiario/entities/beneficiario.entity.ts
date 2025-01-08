import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Beneficiario {

    @PrimaryColumn()
    ci: string;

    @Column()
    nombre_beneficiario: string;

    @Column()
    celular_beneficiario: string;

    @Column()
    ci_beneficiario: string;

    @Column()
    fec_mod: string;

    @Column()
    user_mod: string;

}