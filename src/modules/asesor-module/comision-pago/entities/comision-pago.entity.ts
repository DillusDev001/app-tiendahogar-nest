import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class ComisionPago {

    @PrimaryColumn()
    cod_contrato: string;

    @PrimaryColumn()
    ci_asesor: string;

    @Column('decimal', { precision: 10, scale: 2 })
    monto: number;

    @Column()
    moneda: string;

    @Column()
    fec_pago: string;

    @Column()
    tipo_pago: string;

    @Column()
    fec_mod: string;

    @Column()
    user_mod: string;

    @Column()
    estado: number;

}