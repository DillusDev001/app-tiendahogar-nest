import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Auth } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from 'src/common/services/hash.service';
import { PersonaService } from 'src/modules/persona-module/persona/persona.service';
import { UsuarioService } from '../usuario/usuario.service';
import { Persona } from 'src/modules/persona-module/persona/entities/persona.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { TokenService } from 'src/common/services/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), TypeOrmModule.forFeature([Persona]), TypeOrmModule.forFeature([Usuario])],
  controllers: [AuthController],
  providers: [AuthService, HashService, TokenService, PersonaService, UsuarioService],
})
export class AuthModule { }
