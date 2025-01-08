import { Module } from '@nestjs/common';
import { RiesgoService } from './riesgo.service';
import { RiesgoController } from './riesgo.controller';
import { Riesgo } from './entities/riesgo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Riesgo])],
  controllers: [RiesgoController],
  providers: [RiesgoService],
})
export class RiesgoModule { }
