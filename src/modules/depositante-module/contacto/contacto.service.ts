import { Injectable } from '@nestjs/common';
import { ContactoDto } from './dto/contacto.dto';
import { UpdateContactoDto } from './dto/update-contacto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contacto } from './entities/contacto.entity';
import { Repository } from 'typeorm';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class ContactoService {

  constructor(
    @InjectRepository(Contacto) private contactoRepository: Repository<Contacto>,
  ) { }

  async createMultiple(array: ContactoDto[]): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.contactoRepository
      .createQueryBuilder()
      .insert()
      .into(Contacto)
      .values(array)
      .execute();

    const rows = result.raw.affectedRows;

    serviceResult.boolean = rows > 0 ? true : false;
    serviceResult.message = rows > 0 ? rows + ' Contacto(s) agregado(s).' : 'No se han agregado Contacto.';
    serviceResult.number = rows;

    return serviceResult;
  }

  async create(contactoDto: ContactoDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const busqueda = await this.findOne(contactoDto.ci);

    if (!busqueda.boolean) {

      const object = this.contactoRepository.create(contactoDto);
      await this.contactoRepository.save(object);

      serviceResult.boolean = true;
      serviceResult.message = 'Contacto se ha agregado correctamente.';
      serviceResult.number = 1;

    } else {
      serviceResult.message = busqueda.message;
      serviceResult.object = busqueda.object
    }

    return serviceResult;
  }

  async findOne(ci: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.contactoRepository.findOne({ where: { ci } });

    if (result) {
      serviceResult.boolean = true;
      serviceResult.message = 'Existe una Contacto con el ci: ' + ci + '.';
      serviceResult.number = 1;
      serviceResult.object = result
    } else {
      serviceResult.message = 'No existe Contacto.';
    }

    return serviceResult;
  }

  async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const orderCondition = { [attribute]: orderBy };

    const result = await this.contactoRepository.find({ order: orderCondition });

    const count = result.length;

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Contacto(s) encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.contactoRepository
      .createQueryBuilder()
      .orderBy(attribute, orderBy)
      .where(attribute + ' like :value', { value: '%' + value + '%' })
      //.andWhere(estado = 1)
      .getMany()

    const count = result.length;

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Contacto(s) encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async update(ci: string, updateContactoDto: UpdateContactoDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.contactoRepository.update(ci, updateContactoDto);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = 'Se ha actualizado correctamente.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

  async remove(ci: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.contactoRepository.delete(ci);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado la Contacto.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

}
