import { Injectable } from '@nestjs/common';
import { BeneficiarioDto } from './dto/beneficiario.dto';
import { UpdateBeneficiarioDto } from './dto/update-beneficiario.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceResult } from 'src/common/interfaces/service.result';
import { Beneficiario } from './entities/beneficiario.entity';

@Injectable()
export class BeneficiarioService {

  constructor(
    @InjectRepository(Beneficiario) private beneficiarioRepository: Repository<Beneficiario>,
  ) { }

  async createMultiple(array: BeneficiarioDto[]): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.beneficiarioRepository
      .createQueryBuilder()
      .insert()
      .into(Beneficiario)
      .values(array)
      .execute();

    const rows = result.raw.affectedRows;

    serviceResult.boolean = rows > 0 ? true : false;
    serviceResult.message = rows > 0 ? rows + ' Beneficiario(s) agregado(s).' : 'No se han agregado Beneficiario.';
    serviceResult.number = rows;

    return serviceResult;
  }

  async create(beneficiarioDto: BeneficiarioDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const busqueda = await this.findOne(beneficiarioDto.ci);

    if (!busqueda.boolean) {

      const object = this.beneficiarioRepository.create(beneficiarioDto);
      await this.beneficiarioRepository.save(object);

      serviceResult.boolean = true;
      serviceResult.message = 'Beneficiario se ha agregado correctamente.';
      serviceResult.number = 1;

    } else {
      serviceResult.message = busqueda.message;
      serviceResult.object = busqueda.object
    }

    return serviceResult;
  }

  async findOne(ci: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.beneficiarioRepository.findOne({ where: { ci } });

    if (result) {
      serviceResult.boolean = true;
      serviceResult.message = 'Existe una Beneficiario con el ci: ' + ci + '.';
      serviceResult.number = 1;
      serviceResult.object = result
    } else {
      serviceResult.message = 'No existe Beneficiario.';
    }

    return serviceResult;
  }

  async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const orderCondition = { [attribute]: orderBy };

    const result = await this.beneficiarioRepository.find({ order: orderCondition });

    const count = result.length;

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Beneficiario(s) encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.beneficiarioRepository
      .createQueryBuilder()
      .orderBy(attribute, orderBy)
      .where(attribute + ' like :value', { value: '%' + value + '%' })
      //.andWhere(estado = 1)
      .getMany()

    const count = result.length;

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Beneficiario(s) encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async update(ci: string, updateBeneficiarioDto: UpdateBeneficiarioDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.beneficiarioRepository.update(ci, updateBeneficiarioDto);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = 'Se ha actualizado correctamente.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

  async remove(ci: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.beneficiarioRepository.delete(ci);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado la Beneficiario.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

}
