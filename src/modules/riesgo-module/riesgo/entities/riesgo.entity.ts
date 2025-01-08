import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Riesgo {

    @PrimaryColumn()
    ocupacion: string;

    @PrimaryColumn()
    sector: string;

    @Column()
    ingreso: number;

    @Column()
    umbral: number;

}