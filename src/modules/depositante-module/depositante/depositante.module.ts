import { Module } from '@nestjs/common';
import { DepositanteService } from './depositante.service';
import { DepositanteController } from './depositante.controller';
import { Persona } from 'src/modules/persona-module/persona/entities/persona.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Depositante } from './entities/depositante.entity';
import { PersonaService } from 'src/modules/persona-module/persona/persona.service';

@Module({
  imports: [TypeOrmModule.forFeature([Depositante]), TypeOrmModule.forFeature([Persona])],
  controllers: [DepositanteController],
  providers: [DepositanteService, PersonaService],
})
export class DepositanteModule {}
