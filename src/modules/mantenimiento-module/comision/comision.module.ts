import { Module } from '@nestjs/common';
import { ComisionService } from './comision.service';
import { ComisionController } from './comision.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comision } from './entities/comision.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comision])],
  controllers: [ComisionController],
  providers: [ComisionService],
})
export class ComisionModule {}
