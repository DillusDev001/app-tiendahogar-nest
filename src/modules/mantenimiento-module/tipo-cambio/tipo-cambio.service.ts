import { Injectable } from '@nestjs/common';
import { TipoCambioDto } from './dto/tipo-cambio.dto';
import { UpdateTipoCambioDto } from './dto/update-tipo-cambio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoCambio } from './entities/tipo-cambio.entity';
import { Repository } from 'typeorm';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class TipoCambioService {

  constructor(
    @InjectRepository(TipoCambio) private tipoCambioRepository: Repository<TipoCambio>,
  ) { }

  async createMultiple(array: TipoCambioDto[]): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.tipoCambioRepository
      .createQueryBuilder()
      .insert()
      .into(TipoCambio)
      .values(array)
      .execute();

    const rows = result.raw.affectedRows;

    serviceResult.boolean = rows > 0 ? true : false;
    serviceResult.message = rows > 0 ? rows + ' Tipo de Cambio(s) agregado(s).' : 'No se han agregado Tipo Cambio.';
    serviceResult.number = rows;

    return serviceResult;
  }

  async create(tipoCambioDto: TipoCambioDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const busqueda = await this.findOne(tipoCambioDto.moneda);

    if (!busqueda.boolean) {

      const object = this.tipoCambioRepository.create(tipoCambioDto);
      await this.tipoCambioRepository.save(object);

      serviceResult.boolean = true;
      serviceResult.message = 'Tipo de Cambio se ha agregado correctamente.';
      serviceResult.number = 1;

    } else {
      serviceResult.message = busqueda.message;
      serviceResult.object = busqueda.object;
    }

    return serviceResult;
  }

  async findOne(moneda: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.tipoCambioRepository.findOne({ where: { moneda } });

    if (result) {
      serviceResult.boolean = true;
      serviceResult.message = 'Existe un Tipo de Cambio para: ' + moneda + '.';
      serviceResult.number = 1;
      serviceResult.object = result
    } else {
      serviceResult.message = 'No existe un Tipo de Cambio para: ' + moneda + '.';
    }

    return serviceResult;
  }

  async findAll(orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.tipoCambioRepository.find({ order: { moneda: orderBy } });

    const count = result.length;

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Tipo(s) de Cambio(s) encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.tipoCambioRepository
      .createQueryBuilder()
      .orderBy(attribute, orderBy)
      .where(attribute + ' like :value', { value: '%' + value + '%' })
      //.andWhere(estado = 1)
      .getMany()

    const count = result.length;

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Tipo(s) de Cambio(s) encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async update(ci: string, updateTipoCambioDto: UpdateTipoCambioDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.tipoCambioRepository.update(ci, updateTipoCambioDto);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = 'Se ha actualizado correctamente.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

  async remove(ci: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.tipoCambioRepository.delete(ci);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado al Tipo Cambio.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

}