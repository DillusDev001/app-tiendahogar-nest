import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class TipoCambio {

    @PrimaryColumn()
    moneda: string;

    @Column('decimal', { precision: 10, scale: 2 })
    compra: number;

    @Column('decimal', { precision: 10, scale: 2 })
    venta: number;

    @Column()
    fec_mod: string;

    @Column()
    user_mod: string;

    @Column()
    estado: number;

}
