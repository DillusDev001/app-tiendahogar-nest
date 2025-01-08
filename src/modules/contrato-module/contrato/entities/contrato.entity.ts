import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Contrato {
    
    @PrimaryColumn()
    cod_contrato: string;

    @Column()
    anio: number;

    @Column()
    sec: number;

    @Column()
    fec_crea: string;

    @Column()
    id_paquete: number;

    @Column('decimal', { precision: 10, scale: 2 })
    monto_capital: number;

    @Column()
    tipo_contrato: string;

    @Column()
    grupal_individual: string;

    @Column()
    nombre_grupo: string;

    @Column()
    reinversion: string;

    @Column()
    cod_contrato_anterior: string;

    @Column()
    periodo_devolucion: string;

    @Column()
    ci_asesor: string;

    @Column()
    fec_mod: string;

    @Column()
    user_mod: string;
    
    @Column()
    estado: number;

}