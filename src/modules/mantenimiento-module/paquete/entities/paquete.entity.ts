import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Paquete {

    @PrimaryGeneratedColumn()
    id_paquete: number;

    @Column()
    paquete: string;

    @Column()
    descripcion: string;

    @Column()
    tipo_contrato: string;

    @Column('decimal', { precision: 10, scale: 2 })
    monto_min: number;

    @Column('decimal', { precision: 10, scale: 2 })
    monto_max: number;

    @Column()
    interes: number;

    @Column()
    plazo: number;

    @Column()
    moneda: string;

    @Column()
    fec_mod: string;

    @Column()
    user_mod: string;

    @Column()
    estado: number;

}
