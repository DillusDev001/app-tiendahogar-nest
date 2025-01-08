import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Auth {

    @PrimaryColumn()
    usuario: string;

    @Column()
    password: string;

    @Column()
    pregunta: string;

    @Column()
    respuesta: string;

    @Column()
    fec_mod: string;

    @Column()
    user_mod: string;

}