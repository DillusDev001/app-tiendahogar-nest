import { Injectable } from '@nestjs/common';
import { ComisionDto } from './dto/comision.dto';
import { UpdateComisionDto } from './dto/update-comision.dto';
import { ServiceResult } from 'src/common/interfaces/service.result';
import { Comision } from './entities/comision.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ComisionService {
  
  constructor(
    @InjectRepository(Comision) private comisionRepository: Repository<Comision>,
  ) { }

  async createMultiple(array: ComisionDto[]): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.comisionRepository
      .createQueryBuilder()
      .insert()
      .into(Comision)
      .values(array)
      .execute();

    const rows = result.raw.affectedRows;

    serviceResult.boolean = rows > 0 ? true : false;
    serviceResult.message = rows > 0 ? rows + ' Comision(es) agregado(s).' : 'No se han agregado Comision.';
    serviceResult.number = rows;

    return serviceResult;
  }

  async create(comisionDto: ComisionDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const object = this.comisionRepository.create(comisionDto);
    await this.comisionRepository.save(object);

    serviceResult.boolean = true;
    serviceResult.message = 'Comision se ha agregado correctamente.';
    serviceResult.number = 1;

    return serviceResult;
  }

  async findOne(id_comision: number): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.comisionRepository.findOne({ where: { id_comision } });

    if (result) {
      serviceResult.boolean = true;
      serviceResult.message = 'Existe un Comision';
      serviceResult.number = 1;
      serviceResult.object = result
    } else {
      serviceResult.message = 'No existe Comision.';
    }

    return serviceResult;
  }

  async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const orderCondition = { [attribute]: orderBy };

    const result = await this.comisionRepository.find({ order: orderCondition });

    const count = result.length;

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Comision(s) encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.comisionRepository
      .createQueryBuilder()
      .orderBy(attribute, orderBy)
      .where(attribute + ' like :value', { value: '%' + value + '%' })
      //.andWhere(estado = 1)
      .getMany()

    const count = result.length;

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Comision(s) encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async update(id_comision: number, updateComisionDto: UpdateComisionDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.comisionRepository.update(id_comision, updateComisionDto);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = 'Se ha actualizado correctamente.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

  async remove(id_comision: number): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.comisionRepository.delete(id_comision);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Comision.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

}
