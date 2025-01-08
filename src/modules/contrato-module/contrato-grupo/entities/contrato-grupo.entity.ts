import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class ContratoGrupo {

    @PrimaryColumn()
    cod_contrato: string;

    @PrimaryColumn()
    ci: string;

    @PrimaryColumn()
    sec: number;

    @Column()
    rol: string;

    @Column()
    fec_mod: string;

    @Column()
    user_mod: string;

    @Column()
    estado: number;

}