import { Injectable } from '@nestjs/common';
import { PersonaDto } from './dto/persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceResult } from 'src/common/interfaces/service.result';
import { Persona } from './entities/persona.entity';

@Injectable()
export class PersonaService {

  constructor(
    @InjectRepository(Persona) private personaRepository: Repository<Persona>,
  ) { }

  async createMultiple(array: PersonaDto[]): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.personaRepository
      .createQueryBuilder()
      .insert()
      .into(Persona)
      .values(array)
      .execute();

    const rows = result.raw.affectedRows;

    serviceResult.boolean = rows > 0 ? true : false;
    serviceResult.message = rows > 0 ? rows + ' Persona(s) agregado(s).' : 'No se han agregado Persona.';
    serviceResult.number = rows;

    return serviceResult;
  }

  async create(personaDto: PersonaDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const busqueda = await this.findOne(personaDto.ci);

    if (!busqueda.boolean) {

      const object = this.personaRepository.create(personaDto);
      await this.personaRepository.save(object);

      serviceResult.boolean = true;
      serviceResult.message = 'Persona se ha agregado correctamente.';
      serviceResult.number = 1;

    } else {
      serviceResult.message = busqueda.message;
      serviceResult.object = busqueda.object
    }

    return serviceResult;
  }

  async findOne(ci: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.personaRepository.findOne({ where: { ci } });

    if (result) {
      serviceResult.boolean = true;
      serviceResult.message = 'Existe un personacon el ci: ' + ci + '.';
      serviceResult.number = 1;
      serviceResult.object = result
    } else {
      serviceResult.message = 'No existe persona.';
    }

    return serviceResult;
  }

  async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const orderCondition = { [attribute]: orderBy };

    const result = await this.personaRepository.find({ order: orderCondition });

    const count = result.length;

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Persona(s) encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.personaRepository
      .createQueryBuilder()
      .orderBy(attribute, orderBy)
      .where(attribute + ' like :value', { value: '%' + value + '%' })
      //.andWhere(estado = 1)
      .getMany()

    const count = result.length;

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Persona(s) encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async update(ci: string, updatePersonaDto: UpdatePersonaDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.personaRepository.update(ci, updatePersonaDto);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = 'Se ha actualizado correctamente.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

  async remove(ci: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.personaRepository.delete(ci);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Persona.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

}
