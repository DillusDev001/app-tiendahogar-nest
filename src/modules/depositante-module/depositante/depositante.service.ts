import { Injectable } from '@nestjs/common';
import { DepositanteDto } from './dto/depositante.dto';
import { UpdateDepositanteDto } from './dto/update-depositante.dto';
import { PersonaService } from 'src/modules/persona-module/persona/persona.service';
import { Depositante } from './entities/depositante.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class DepositanteService {

  constructor(
    @InjectRepository(Depositante) private depositanteRepository: Repository<Depositante>,
    private personaService: PersonaService
  ) { }

  async createMultiple(array: DepositanteDto[]): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.depositanteRepository
      .createQueryBuilder()
      .insert()
      .into(Depositante)
      .values(array)
      .execute();

    const rows = result.raw.affectedRows;

    serviceResult.boolean = rows > 0 ? true : false;
    serviceResult.message = rows > 0 ? rows + ' Depositante(s) agregado(s).' : 'No se han agregado Depositante.';
    serviceResult.number = rows;

    return serviceResult;
  }

  async create(depositanteDto: DepositanteDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const ci = depositanteDto.ci;

    // Verificar si depositante es unico
    const busquedaDepositante = await this.depositanteRepository.findOne({ where: { ci } });

    if (!busquedaDepositante) {
      const object = this.depositanteRepository.create(depositanteDto);
        await this.depositanteRepository.save(object);

        serviceResult.boolean = true;
        serviceResult.message = 'Depositante se ha agregado correctamente.';
        serviceResult.number = 1;
    } else {
      serviceResult.message = 'Ya existe un depositante con el ci: ' + ci + '.';
    }

    return serviceResult;
  }

  async findOne(ci: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.depositanteRepository.findOne({ where: { ci } });

    if (result) {
      const personaResult = await this.personaService.findOne(result.ci);

      if (personaResult.boolean) {
        result['persona'] = personaResult.object
      } else {
        result['persona'] = null
      }

      serviceResult.boolean = true;
      serviceResult.message = 'Depositante encontrado.';
      serviceResult.number = 1;
      serviceResult.object = result

    } else {
      serviceResult.message = 'No existe depositante.';
    }

    return serviceResult;
  }

  async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const orderCondition = { [attribute]: orderBy };
    const result = await this.depositanteRepository.find({ order: orderCondition });
    const count = result.length;

    if (count > 0) {
      const updatedResult = await Promise.all(
        result.map(async (item) => {
          const resultDepositante = await this.personaService.findOne(item.ci);
          item['persona'] = resultDepositante.boolean ? resultDepositante.object : null;
          return item; // Devuelve el item actualizado
        })
      );

      serviceResult.data = updatedResult;
    }

    serviceResult.boolean = count > 0;
    serviceResult.message = `${count} Depositante(s) encontrado(s).`;
    serviceResult.number = count;

    return serviceResult;
  }

  async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.depositanteRepository
      .createQueryBuilder()
      .orderBy(attribute, orderBy)
      .where(attribute + ' like :value', { value: '%' + value + '%' })
      //.andWhere(estado = 1)
      .getMany()

    const count = result.length;

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Depositante(s) encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async update(ci: string, updateDepositanteDto: UpdateDepositanteDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.depositanteRepository.update(ci, updateDepositanteDto);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = 'Se ha actualizado correctamente.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

  async remove(ci: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.depositanteRepository.delete(ci);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Depositante.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

}
