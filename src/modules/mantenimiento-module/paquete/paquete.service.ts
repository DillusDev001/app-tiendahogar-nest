import { Injectable } from '@nestjs/common';
import { PaqueteDto } from './dto/paquete.dto';
import { UpdatePaqueteDto } from './dto/update-paquete.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Paquete } from './entities/paquete.entity';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class PaqueteService {

  constructor(
    @InjectRepository(Paquete) private paqueteRepository: Repository<Paquete>,
  ) { }

  async createMultiple(array: PaqueteDto[]): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.paqueteRepository
      .createQueryBuilder()
      .insert()
      .into(Paquete)
      .values(array)
      .execute();

    const rows = result.raw.affectedRows;

    serviceResult.boolean = rows > 0 ? true : false;
    serviceResult.message = rows > 0 ? rows + ' Paquete(s) agregado(s).' : 'No se han agregado Paquete.';
    serviceResult.number = rows;

    return serviceResult;
  }

  async create(paqueteDto: PaqueteDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const object = this.paqueteRepository.create(paqueteDto);
    await this.paqueteRepository.save(object);

    serviceResult.boolean = true;
    serviceResult.message = 'Paquete se ha agregado correctamente.';
    serviceResult.number = 1;

    return serviceResult;
  }

  async findOne(id_paquete: number): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.paqueteRepository.findOne({ where: { id_paquete } });

    if (result) {
      serviceResult.boolean = true;
      serviceResult.message = 'Existe un Paquete';
      serviceResult.number = 1;
      serviceResult.object = result
    } else {
      serviceResult.message = 'No existe Paquete.';
    }

    return serviceResult;
  }

  async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const orderCondition = { [attribute]: orderBy };

    const result = await this.paqueteRepository.find({ order: orderCondition });

    const count = result.length;

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Paquete(s) encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.paqueteRepository
      .createQueryBuilder()
      .orderBy(attribute, orderBy)
      .where(attribute + ' like :value', { value: '%' + value + '%' })
      //.andWhere(estado = 1)
      .getMany()

    const count = result.length;

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Paquete(s) encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async update(id_paquete: number, updatePaqueteDto: UpdatePaqueteDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.paqueteRepository.update(id_paquete, updatePaqueteDto);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = 'Se ha actualizado correctamente.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

  async remove(id_paquete: number): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.paqueteRepository.delete(id_paquete);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Paquete.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

}
