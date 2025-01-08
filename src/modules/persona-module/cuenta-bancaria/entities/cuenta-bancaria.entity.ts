import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class CuentaBancaria {

    @PrimaryColumn()
    ci: string;

    @Column()
    banco: string;

    @Column()
    nro_cuenta: string;

    @Column()
    moneda: string;

    @Column()
    tipo_cuenta: string;

    @Column()
    fec_mod: string;

    @Column()
    user_mod: string;

}