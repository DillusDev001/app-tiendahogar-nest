import { Injectable } from '@nestjs/common';
import { ContratoGrupoDto } from './dto/contrato-grupo.dto';
import { UpdateContratoGrupoDto } from './dto/update-contrato-grupo.dto';
import { Repository } from 'typeorm';
import { ContratoGrupo } from './entities/contrato-grupo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceResult } from 'src/common/interfaces/service.result';
import { PersonaService } from 'src/modules/persona-module/persona/persona.service';

@Injectable()
export class ContratoGrupoService {

  constructor(
    @InjectRepository(ContratoGrupo) private contratoGrupoRepository: Repository<ContratoGrupo>,
    private personaService: PersonaService
  ) { }

  async createMultiple(array: ContratoGrupoDto[]): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.contratoGrupoRepository
      .createQueryBuilder()
      .insert()
      .into(ContratoGrupo)
      .values(array)
      .execute();

    const rows = result.raw.affectedRows;

    serviceResult.boolean = rows > 0 ? true : false;
    serviceResult.message = rows > 0 ? rows + ' Depositante(s) agregado(s) al grupo.' : 'No se han agregado Depositantes.';
    serviceResult.number = rows;

    return serviceResult;
  }

  async create(contratoGrupoDto: ContratoGrupoDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const object = this.contratoGrupoRepository.create(contratoGrupoDto);
    await this.contratoGrupoRepository.save(object);

    serviceResult.boolean = true;
    serviceResult.message = 'Depositante se ha agregado correctamente.';
    serviceResult.number = 1;

    return serviceResult;
  }

  async findAll(cod_contrato: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.contratoGrupoRepository.find({ where: { cod_contrato }, order: { sec: 'ASC' } });

    const count = result.length;

    if (count > 0) {
      const updatedResult = await Promise.all(
        result.map(async (item) => {
          const resultUsuario = await this.personaService.findOne(item.ci);
          item['persona'] = resultUsuario.boolean ? resultUsuario.object : null;
          return item; // Devuelve el item actualizado
        })
      );

      serviceResult.data = updatedResult;
    }

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Depositante(s) encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async update(cod_contrato: string, ci: string, sec: number, updateContratoGrupoDto: UpdateContratoGrupoDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.contratoGrupoRepository.update({ cod_contrato, ci, sec }, updateContratoGrupoDto);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = 'Se ha actualizado correctamente.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

  async remove(cod_contrato: string, ci: string, sec: number): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.contratoGrupoRepository.delete({ cod_contrato, ci, sec });

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el ContratoGrupo.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

}
