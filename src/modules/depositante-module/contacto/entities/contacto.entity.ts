import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Contacto {

    @PrimaryColumn()
    ci: string;

    @Column()
    nombre_contacto: string;

    @Column()
    celular_contacto: string;

    @Column()
    fec_mod: string;

    @Column()
    user_mod: string;


}