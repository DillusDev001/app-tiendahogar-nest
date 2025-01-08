import { Module } from '@nestjs/common';
import { ContratoPlanDevolucionService } from './contrato-plan-devolucion.service';
import { ContratoPlanDevolucionController } from './contrato-plan-devolucion.controller';
import { Persona } from 'src/modules/persona-module/persona/entities/persona.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoPlanDevolucion } from './entities/contrato-plan-devolucion.entity';
import { PersonaService } from 'src/modules/persona-module/persona/persona.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContratoPlanDevolucion]), TypeOrmModule.forFeature([Persona])],
  controllers: [ContratoPlanDevolucionController],
  providers: [ContratoPlanDevolucionService, PersonaService],
})
export class ContratoPlanDevolucionModule {}
