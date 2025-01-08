import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class ContratoDeposito {

    @PrimaryColumn()
    cod_contrato: string;

    @PrimaryColumn()
    sec: number;

    @Column('decimal', { precision: 10, scale: 2 })
    monto: number;

    @Column()
    ci_depositante: string;

    @Column()
    fec_deposito: string;

    @Column()
    tipo_deposito: string;

    @Column()
    descripcion: string;

    @Column()
    fec_mod: string;

    @Column()
    user_mod: string;

    @Column()
    estado: number;

}