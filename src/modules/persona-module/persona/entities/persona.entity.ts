import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Persona {

    @PrimaryColumn()
    ci: string;

    @Column()
    exp: string;

    @Column()
    nombres: string;

    @Column()
    apellidos: string;

    @Column()
    code: string;

    @Column()
    celular: string;

    @Column()
    nacionalidad: string;

    @Column()
    fec_nac: string;

    @Column()
    direccion: string;

    @Column()
    descripcion: string;

    @Column()
    fec_mod: string;

    @Column()
    user_mod: string;

}