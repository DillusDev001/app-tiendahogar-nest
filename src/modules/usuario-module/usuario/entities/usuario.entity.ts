import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryColumn()
    ci: string;

    @Column()
    usuario: string;

    @Column()
    rol: string;

    @Column()
    autorizacion: number;

    @Column()
    fec_mod: string;

    @Column()
    user_mod: string;

    @Column()
    estado: number;

}