import { Column, Entity, PrimaryColumn } from "typeorm";
@Entity()
export class Asesor {

    @PrimaryColumn()
    ci: string;

    @Column()
    fec_ingreso: string;

    @Column()
    antiguedad: number;

    @Column()
    fec_mod: string;

    @Column()
    user_mod: string;

    @Column()
    estado: number;

}
