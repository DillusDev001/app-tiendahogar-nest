import { Module } from '@nestjs/common';
import { ContratoDepositoService } from './contrato-deposito.service';
import { ContratoDepositoController } from './contrato-deposito.controller';
import { PersonaService } from 'src/modules/persona-module/persona/persona.service';
import { ContratoDeposito } from './entities/contrato-deposito.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from 'src/modules/persona-module/persona/entities/persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContratoDeposito]), TypeOrmModule.forFeature([Persona])],
  controllers: [ContratoDepositoController],
  providers: [ContratoDepositoService, PersonaService],
})
export class ContratoDepositoModule {}
