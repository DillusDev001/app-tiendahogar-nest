import { Module } from '@nestjs/common';
import { CuentaBancariaService } from './cuenta-bancaria.service';
import { CuentaBancariaController } from './cuenta-bancaria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuentaBancaria } from './entities/cuenta-bancaria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CuentaBancaria])],
  controllers: [CuentaBancariaController],
  providers: [CuentaBancariaService],
})
export class CuentaBancariaModule {}
