import { Injectable } from '@nestjs/common';
import { ComisionPagoDto } from './dto/comision-pago.dto';
import { UpdateComisionPagoDto } from './dto/update-comision-pago.dto';
import { ComisionPago } from './entities/comision-pago.entity';
import { Repository } from 'typeorm';
import { ServiceResult } from 'src/common/interfaces/service.result';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ComisionPagoService {

  constructor(
    @InjectRepository(ComisionPago) private comisionPagoRepository: Repository<ComisionPago>,
  ) { }

  async createMultiple(array: ComisionPagoDto[]): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.comisionPagoRepository
      .createQueryBuilder()
      .insert()
      .into(ComisionPago)
      .values(array)
      .execute();

    const rows = result.raw.affectedRows;

    serviceResult.boolean = rows > 0 ? true : false;
    serviceResult.message = rows > 0 ? rows + ' Pago(s) agregado(s).' : 'No se han agregado Pagos.';
    serviceResult.number = rows;

    return serviceResult;
  }

  async create(comisionPagoDto: ComisionPagoDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const cod_contrato = comisionPagoDto.cod_contrato;
    const ci_asesor = comisionPagoDto.ci_asesor;

    // Verificar Contrato Asesor pago
    const busquedaAsesor = await this.comisionPagoRepository.findOne({ where: { cod_contrato, ci_asesor } });

    if (!busquedaAsesor) {
      const object = this.comisionPagoRepository.create(comisionPagoDto);
      await this.comisionPagoRepository.save(object);

      serviceResult.boolean = true;
      serviceResult.message = 'Se ha agregado pago de comisión correctamente.';
      serviceResult.number = 1;
    } else {
      serviceResult.message = 'Existe un Pago de Comision para el contrato: ' + cod_contrato + '.';
    }

    return serviceResult;
  }

  async findOne(cod_contrato: string, ci_asesor: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.comisionPagoRepository.findOne({ where: { cod_contrato, ci_asesor } });

    if (result) {
      serviceResult.boolean = true;
      serviceResult.message = 'Existe un Pago de Comision para el contrato: ' + cod_contrato + '.';
      serviceResult.number = 1;
      serviceResult.object = result
    } else {
      serviceResult.message = 'No existe un Pago de Comisión para el contrato: ' + cod_contrato + '.';
    }

    return serviceResult;
  }

  async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const orderCondition = { [attribute]: orderBy };

    const result = await this.comisionPagoRepository.find({ order: orderCondition });

    const count = result.length;

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Pago(s) de comisión encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.comisionPagoRepository
      .createQueryBuilder()
      .orderBy(attribute, orderBy)
      .where(attribute + ' like :value', { value: '%' + value + '%' })
      //.andWhere(estado = 1)
      .getMany()

    const count = result.length;

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Pago(s) de comisión encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async update(cod_contrato: string, ci_asesor: string, updateComisionPagoDto: UpdateComisionPagoDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.comisionPagoRepository.update({ cod_contrato, ci_asesor }, updateComisionPagoDto);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = 'Se ha actualizado correctamente.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

  async remove(cod_contrato: string, ci_asesor: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.comisionPagoRepository.delete({ cod_contrato, ci_asesor });

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Comisión para el contrato: ' + cod_contrato + '.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

}
