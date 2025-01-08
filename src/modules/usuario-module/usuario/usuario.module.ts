import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Persona } from 'src/modules/persona-module/persona/entities/persona.entity';
import { PersonaService } from 'src/modules/persona-module/persona/persona.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), TypeOrmModule.forFeature([Persona])],
  controllers: [UsuarioController],
  providers: [UsuarioService, PersonaService],
})
export class UsuarioModule {}
