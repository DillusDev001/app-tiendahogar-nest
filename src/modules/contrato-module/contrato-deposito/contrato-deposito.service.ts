import { Injectable } from '@nestjs/common';
import { ContratoDepositoDto } from './dto/contrato-deposito.dto';
import { UpdateContratoDepositoDto } from './dto/update-contrato-deposito.dto';
import { PersonaService } from 'src/modules/persona-module/persona/persona.service';
import { ContratoDeposito } from './entities/contrato-deposito.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class ContratoDepositoService {

  constructor(
    @InjectRepository(ContratoDeposito) private contratoDepositoRepository: Repository<ContratoDeposito>,
    private personaService: PersonaService
  ) { }

  async createMultiple(array: ContratoDepositoDto[]): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.contratoDepositoRepository
      .createQueryBuilder()
      .insert()
      .into(ContratoDeposito)
      .values(array)
      .execute();

    const rows = result.raw.affectedRows;

    serviceResult.boolean = rows > 0 ? true : false;
    serviceResult.message = rows > 0 ? rows + ' Depósito(s) agregado(s).' : 'No se han agregado Depósitos.';
    serviceResult.number = rows;

    return serviceResult;
  }

  async create(contratoDepositoDto: ContratoDepositoDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const object = this.contratoDepositoRepository.create(contratoDepositoDto);
    await this.contratoDepositoRepository.save(object);

    serviceResult.boolean = true;
    serviceResult.message = 'Depósito se ha agregado correctamente.';
    serviceResult.number = 1;

    return serviceResult;
  }

  async findOne(cod_contrato: string, sec: number): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.contratoDepositoRepository.findOne({ where: { cod_contrato, sec } });

    if (result) {
      const personaResult = await this.personaService.findOne(result.ci_depositante);

      result['persona'] = personaResult.boolean && personaResult.object.ci_depositante !== '0' ? personaResult.object : null;

      serviceResult.boolean = true;
      serviceResult.message = 'Existe un Depósito';
      serviceResult.number = 1;
      serviceResult.object = result
    } else {
      serviceResult.message = 'No existe Depósito.';
    }

    return serviceResult;
  }

  async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const orderCondition = { [attribute]: orderBy };

    const result = await this.contratoDepositoRepository
      .createQueryBuilder()
      .orderBy(attribute, orderBy)
      .groupBy(attribute)
      .getMany()

    const count = result.length;

    var data = [];

    // buscar depositos para cada contrato
    for (const itemContratos of result) {
      // Obtener los depositos del contrato
      const cod_contrato = itemContratos.cod_contrato
      const resultDepositos = await this.contratoDepositoRepository.find({ where: { cod_contrato }, order: { sec: 'ASC' } });

      // Por cada deposito encontrar a la persona
      for (const itemPersona of resultDepositos) {
        const resultUsuario = await this.personaService.findOne(itemPersona.ci_depositante);
        itemPersona['persona'] = resultUsuario.boolean && resultUsuario.object.ci_depositante !== '0' ? resultUsuario.object : null;
      }

      data.push(resultDepositos)
    }

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Contratos(s) encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = data;

    return serviceResult;
  }

  async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.contratoDepositoRepository
      .createQueryBuilder()
      .orderBy(attribute, orderBy)
      .where(attribute + ' like :value', { value: '%' + value + '%' })
      //.andWhere(estado = 1)
      .getMany()

    const count = result.length;

    if (count > 0) {
      const updatedResult = await Promise.all(
        result.map(async (item) => {
          const resultUsuario = await this.personaService.findOne(item.ci_depositante);
          item['persona'] = resultUsuario.boolean && resultUsuario.object.ci_depositante !== '0' ? resultUsuario.object : null;
          return item; // Devuelve el item actualizado
        })
      );

      serviceResult.data = updatedResult;
    }

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Depósito(s) encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async update(cod_contrato: string, sec: number, updateContratoDepositoDto: UpdateContratoDepositoDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.contratoDepositoRepository.update({ cod_contrato, sec }, updateContratoDepositoDto);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = 'Se ha actualizado correctamente.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

  async remove(cod_contrato: string, sec: number): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.contratoDepositoRepository.delete({ cod_contrato, sec });

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Depósito.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

}
