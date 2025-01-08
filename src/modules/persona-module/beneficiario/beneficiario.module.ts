import { Module } from '@nestjs/common';
import { BeneficiarioService } from './beneficiario.service';
import { BeneficiarioController } from './beneficiario.controller';
import { Beneficiario } from './entities/beneficiario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Beneficiario])],
  controllers: [BeneficiarioController],
  providers: [BeneficiarioService],
})
export class BeneficiarioModule {}
