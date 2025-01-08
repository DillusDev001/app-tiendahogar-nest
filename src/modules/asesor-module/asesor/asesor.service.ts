import { Injectable } from '@nestjs/common';
import { AsesorDto } from './dto/asesor.dto';
import { UpdateAsesorDto } from './dto/update-asesor.dto';
import { ServiceResult } from 'src/common/interfaces/service.result';
import { Asesor } from './entities/asesor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonaService } from 'src/modules/persona-module/persona/persona.service';

@Injectable()
export class AsesorService {

  constructor(
    @InjectRepository(Asesor) private asesorRepository: Repository<Asesor>,
    private personaService: PersonaService
  ) { }

  async createMultiple(array: AsesorDto[]): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.asesorRepository
      .createQueryBuilder()
      .insert()
      .into(Asesor)
      .values(array)
      .execute();

    const rows = result.raw.affectedRows;

    serviceResult.boolean = rows > 0 ? true : false;
    serviceResult.message = rows > 0 ? rows + ' Asesor(s) agregado(s).' : 'No se han agregado Asesor.';
    serviceResult.number = rows;

    return serviceResult;
  }

  async create(asesorDto: AsesorDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const ci = asesorDto.ci;

    // Verificar si asesor es unico
    const busquedaAsesor = await this.asesorRepository.findOne({ where: { ci } });

    if (!busquedaAsesor) {
      const object = this.asesorRepository.create(asesorDto);
      await this.asesorRepository.save(object);

      serviceResult.boolean = true;
      serviceResult.message = 'Asesor se ha agregado correctamente.';
      serviceResult.number = 1;
    } else {
      serviceResult.message = 'Ya existe un asesor con el ci: ' + ci + '.';
    }

    return serviceResult;
  }

  async findOne(ci: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.asesorRepository.findOne({ where: { ci } });

    if (result) {
      const personaResult = await this.personaService.findOne(result.ci);

      if (personaResult.boolean) {
        result['persona'] = personaResult.object
      } else {
        result['persona'] = null
      }

      serviceResult.boolean = true;
      serviceResult.message = 'Asesor encontrado.';
      serviceResult.number = 1;
      serviceResult.object = result

    } else {
      serviceResult.message = 'No existe asesor.';
    }

    return serviceResult;
  }

  async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const orderCondition = { [attribute]: orderBy };
    const result = await this.asesorRepository.find({ order: orderCondition });
    const count = result.length;

    if (count > 0) {
      const updatedResult = await Promise.all(
        result.map(async (item) => {
          const resultAsesor = await this.personaService.findOne(item.ci);
          item['persona'] = resultAsesor.boolean ? resultAsesor.object : null;
          return item; // Devuelve el item actualizado
        })
      );

      serviceResult.data = updatedResult;
    }

    serviceResult.boolean = count > 0;
    serviceResult.message = `${count} Asesor(s) encontrado(s).`;
    serviceResult.number = count;

    return serviceResult;
  }

  async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.asesorRepository
      .createQueryBuilder()
      .orderBy(attribute, orderBy)
      .where(attribute + ' like :value', { value: '%' + value + '%' })
      //.andWhere(estado = 1)
      .getMany()

    const count = result.length;

    if (count > 0) {
      const updatedResult = await Promise.all(
        result.map(async (item) => {
          const resultAsesor = await this.personaService.findOne(item.ci);
          item['persona'] = resultAsesor.boolean ? resultAsesor.object : null;
          return item; // Devuelve el item actualizado
        })
      );

      serviceResult.data = updatedResult;
    }

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Asesor(s) encontrado(s).';
    serviceResult.number = count;

    return serviceResult;
  }

  async update(asesor: string, updateAsesorDto: UpdateAsesorDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.asesorRepository.update(asesor, updateAsesorDto);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = 'Se ha actualizado correctamente.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

  async remove(asesor: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.asesorRepository.delete(asesor);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Asesor.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

}
