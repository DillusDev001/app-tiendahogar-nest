import { Injectable } from '@nestjs/common';
import { UsuarioDto } from './dto/usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceResult } from 'src/common/interfaces/service.result';
import { Usuario } from './entities/usuario.entity';
import { PersonaService } from 'src/modules/persona-module/persona/persona.service';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    private personaService: PersonaService
  ) { }

  async createMultiple(array: UsuarioDto[]): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.usuarioRepository
      .createQueryBuilder()
      .insert()
      .into(Usuario)
      .values(array)
      .execute();

    const rows = result.raw.affectedRows;

    serviceResult.boolean = rows > 0 ? true : false;
    serviceResult.message = rows > 0 ? rows + ' Usuario(s) agregado(s).' : 'No se han agregado Usuario.';
    serviceResult.number = rows;

    return serviceResult;
  }

  async create(usuarioDto: UsuarioDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const usuario = usuarioDto.usuario;
    const ci = usuarioDto.ci;

    // Verificar si usuario es unico
    const busquedaUsuario = await this.usuarioRepository.findOne({ where: { usuario } });

    if (!busquedaUsuario) {
      // Verificar si ci ya está insertado
      const busquedaCi = await this.usuarioRepository.findOne({ where: { ci } });

      if (!busquedaCi) {
        const object = this.usuarioRepository.create(usuarioDto);
        await this.usuarioRepository.save(object);

        serviceResult.boolean = true;
        serviceResult.message = 'Usuario se ha agregado correctamente.';
        serviceResult.number = 1;
      } else {
        serviceResult.message = 'Existe un usuario con el ci: ' + ci + '.';
      }
    } else {
      serviceResult.message = 'Ya existe un usuario: ' + usuario + '.';
    }

    return serviceResult;
  }

  async findOne(usuario: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.usuarioRepository.findOne({ where: { usuario } });

    if (result) {
      const personaResult = await this.personaService.findOne(result.ci);

      if (personaResult.boolean) {
        result['persona'] = personaResult.object
      } else {
        result['persona'] = null
      }

      serviceResult.boolean = true;
      serviceResult.message = 'Usuario encontrado.';
      serviceResult.number = 1;
      serviceResult.object = result

    } else {
      serviceResult.message = 'No existe usuario.';
    }

    return serviceResult;
  }

  async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const orderCondition = { [attribute]: orderBy };
    const result = await this.usuarioRepository.find({ order: orderCondition });
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

    serviceResult.boolean = count > 0;
    serviceResult.message = `${count} Usuario(s) encontrado(s).`;
    serviceResult.number = count;

    return serviceResult;
  }

  async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.usuarioRepository
      .createQueryBuilder()
      .orderBy(attribute, orderBy)
      .where(attribute + ' like :value', { value: '%' + value + '%' })
      //.andWhere(estado = 1)
      .getMany()

    const count = result.length;

    serviceResult.boolean = count > 0 ? true : false;
    serviceResult.message = count + ' Usuario(s) encontrado(s).';
    serviceResult.number = count;
    serviceResult.data = result;

    return serviceResult;
  }

  async update(usuario: string, updateUsuarioDto: UpdateUsuarioDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.usuarioRepository.update(usuario, updateUsuarioDto);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = 'Se ha actualizado correctamente.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

  async remove(usuario: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.usuarioRepository.delete(usuario);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Usuario.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

}
