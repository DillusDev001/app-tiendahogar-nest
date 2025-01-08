import { Module } from '@nestjs/common';
import { ComisionPagoService } from './comision-pago.service';
import { ComisionPagoController } from './comision-pago.controller';
import { ComisionPago } from './entities/comision-pago.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ComisionPago])],
  controllers: [ComisionPagoController],
  providers: [ComisionPagoService],
})
export class ComisionPagoModule {}
