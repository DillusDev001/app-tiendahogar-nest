import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class ContratoPlanDevolucion {

    @PrimaryColumn()
    cod_contrato: string;

    @PrimaryColumn()
    sec: number;

    @Column('decimal', { precision: 10, scale: 2 })
    monto: number;

    @Column()
    fec_devolucion: string;

    @Column()
    razon_devolucion: string;

    @Column()
    tipo_devolucion: string;

    @Column()
    ci_devolucion: string;

    @Column()
    fec_mod: string;

    @Column()
    user_mod: string;

    @Column()
    estado: number;

}