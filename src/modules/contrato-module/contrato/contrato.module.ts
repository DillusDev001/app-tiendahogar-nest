import { Module } from '@nestjs/common';
import { ContratoService } from './contrato.service';
import { ContratoController } from './contrato.controller';
import { Contrato } from './entities/contrato.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paquete } from 'src/modules/mantenimiento-module/paquete/entities/paquete.entity';
import { PaqueteService } from 'src/modules/mantenimiento-module/paquete/paquete.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contrato]), TypeOrmModule.forFeature([Paquete])],
  controllers: [ContratoController],
  providers: [ContratoService, PaqueteService],
})
export class ContratoModule {}
