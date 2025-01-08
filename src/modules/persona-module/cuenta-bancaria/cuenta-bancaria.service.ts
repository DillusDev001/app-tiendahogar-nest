import { Injectable } from '@nestjs/common';
import { CuentaBancariaDto } from './dto/cuenta-bancaria.dto';
import { UpdateCuentaBancariaDto } from './dto/update-cuenta-bancaria.dto';
import { ServiceResult } from 'src/common/interfaces/service.result';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CuentaBancaria } from './entities/cuenta-bancaria.entity';

@Injectable()
export class CuentaBancariaService {

  constructor(
    @InjectRepository(CuentaBancaria) private cuentaBancariaRepository: Repository<CuentaBancaria>,
  ) { }

  async createMultiple(array: CuentaBancariaDto[]): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.cuentaBancariaRepository
      .createQueryBuilder()
      .insert()
      .into(CuentaBancaria)
      .values(array)
      .execute();

    const rows = result.raw.affectedRows;

    serviceResult.boolean = rows > 0 ? true : false;
    serviceResult.message = rows > 0 ? rows + ' Cuenta(s) Bancaria(s) agregado(s).' : 'No se han agregado Cuenta Bancaria.';
    serviceResult.number = rows;

    return serviceResult;
  }

  async create(cuentaBancariaDto: CuentaBancariaDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const busqueda = await this.findOne(cuentaBancariaDto.ci);

    if (!busqueda.boolean) {

      const object = this.cuentaBancariaRepository.create(cuentaBancariaDto);
      await this.cuentaBancariaRepository.save(object);

      serviceResult.boolean = true;
      serviceResult.message = 'Cuenta Bancaria se ha agregado correctamente.';
      serviceResult.number = 1;

    } else {
      serviceResult.message = busqueda.message;
      serviceResult.object = busqueda.object
    }

    return serviceResult;
  }

  async findOne(ci: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.cuentaBancariaRepository.findOne({ where: { ci } });

    if (result) {
      serviceResult.boolean = true;
      serviceResult.message = 'Existe una Cuenta Bancaria con el ci: ' + ci + '.';
      serviceResult.number = 1;
      serviceResult.object = result
    } else {
      serviceResult.message = 'No existe Cuenta Bancaria.';
    }

    return serviceResult;
  }

  async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const orderCondition = { [attribute]: orderBy };

    const result = await this.cuentaBancariaRepository.find({ order: orderCondition });

    const count = result.length;

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Cuenta(s) Bancaria(s) encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.cuentaBancariaRepository
      .createQueryBuilder()
      .orderBy(attribute, orderBy)
      .where(attribute + ' like :value', { value: '%' + value + '%' })
      //.andWhere(estado = 1)
      .getMany()

    const count = result.length;

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Cuenta(s) Bancaria(s) encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async update(ci: string, updateCuentaBancariaDto: UpdateCuentaBancariaDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.cuentaBancariaRepository.update(ci, updateCuentaBancariaDto);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = 'Se ha actualizado correctamente.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

  async remove(ci: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.cuentaBancariaRepository.delete(ci);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado la Cuenta Bancaria.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

}
