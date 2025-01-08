import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Depositante {

    @PrimaryColumn()
    ci: string;
    
    @Column()
    ocupacion: string;
    
    @Column()
    sector: string;
    
    @Column()
    nota: string;
    
    @Column()
    fec_mod: string;
    
    @Column()
    user_mod: string;
    
    @Column()
    estado: number;
    
}