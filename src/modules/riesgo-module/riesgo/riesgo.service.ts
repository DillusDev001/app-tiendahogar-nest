import { Injectable } from '@nestjs/common';
import { RiesgoDto } from './dto/riesgo.dto';
import { UpdateRiesgoDto } from './dto/update-riesgo.dto';
import { Repository } from 'typeorm';
import { Riesgo } from './entities/riesgo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class RiesgoService {

  constructor(
    @InjectRepository(Riesgo) private riesgoRepository: Repository<Riesgo>,
  ) { }

  async createMultiple(array: RiesgoDto[]): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.riesgoRepository
      .createQueryBuilder()
      .insert()
      .into(Riesgo)
      .values(array)
      .execute();

    const rows = result.raw.affectedRows;

    serviceResult.boolean = rows > 0 ? true : false;
    serviceResult.message = rows > 0 ? rows + ' Perfil(es) de Riesgo agregado(s).' : 'No se han agregado Perfiles de Riesgo.';
    serviceResult.number = rows;

    return serviceResult;
  }

  async create(riesgoDto: RiesgoDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const busqueda = await this.findOne(riesgoDto.ocupacion, riesgoDto.sector);

    if (!busqueda.boolean) {
      const object = this.riesgoRepository.create(riesgoDto);
      await this.riesgoRepository.save(object);

      serviceResult.boolean = true;
      serviceResult.message = 'Perfil de Riesgo se ha agregado correctamente.';
      serviceResult.number = 1;

    } else {
      serviceResult.message = busqueda.message;
    }

    return serviceResult;
  }

  async findOne(ocupacion: string, sector: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.riesgoRepository.findOne({ where: { ocupacion, sector } });

    if (result) {
      serviceResult.boolean = true;
      serviceResult.message = 'Existe un Perfil de Riesgo';
      serviceResult.number = 1;
      serviceResult.object = result
    } else {
      serviceResult.message = 'No existe Perfil de Riesgo.';
    }

    return serviceResult;
  }

  async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const orderCondition = { [attribute]: orderBy };

    const result = await this.riesgoRepository.find({ order: orderCondition });

    const count = result.length;

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Perfil(es) de Riesgo encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.riesgoRepository
      .createQueryBuilder()
      .orderBy(attribute, orderBy)
      .where(attribute + ' like :value', { value: '%' + value + '%' })
      //.andWhere(estado = 1)
      .getMany()

    const count = result.length;

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Perfil(es) de Riesgo encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async update(ocupacion: string, sector: string, updateRiesgoDto: UpdateRiesgoDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.riesgoRepository.update({ ocupacion, sector }, updateRiesgoDto);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = 'Se ha actualizado correctamente.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

  async remove(ocupacion: string, sector: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.riesgoRepository.delete({ ocupacion, sector });

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Perfil de Riesgo.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

}
