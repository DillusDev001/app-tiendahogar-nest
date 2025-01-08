import { Module } from '@nestjs/common';
import { ContratoGrupoService } from './contrato-grupo.service';
import { ContratoGrupoController } from './contrato-grupo.controller';
import { ContratoGrupo } from './entities/contrato-grupo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaService } from 'src/modules/persona-module/persona/persona.service';
import { Persona } from 'src/modules/persona-module/persona/entities/persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContratoGrupo]), TypeOrmModule.forFeature([Persona])],
  controllers: [ContratoGrupoController],
  providers: [ContratoGrupoService, PersonaService],
})
export class ContratoGrupoModule {}
