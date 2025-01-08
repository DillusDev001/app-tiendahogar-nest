import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comision {

    @PrimaryGeneratedColumn()
    id_comision: number;

    @Column()
    antiguedad: number;

    @Column()
    min_anios: number;

    @Column()
    max_anios: number;

    @Column('decimal', { precision: 10, scale: 2 })
    comision: number;

    @Column()
    fec_mod: string;

    @Column()
    user_mod: string;

}