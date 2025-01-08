import { Module } from '@nestjs/common';
import { AsesorService } from './asesor.service';
import { AsesorController } from './asesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asesor } from './entities/asesor.entity';
import { PersonaService } from 'src/modules/persona-module/persona/persona.service';
import { Persona } from 'src/modules/persona-module/persona/entities/persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asesor]), TypeOrmModule.forFeature([Persona])],
  controllers: [AsesorController],
  providers: [AsesorService, PersonaService],
})
export class AsesorModule {}
