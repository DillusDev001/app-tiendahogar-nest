import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceResult } from 'src/common/interfaces/service.result';
import { Auth } from './entities/auth.entity';
import { HashService } from 'src/common/services/hash.service';
import { UsuarioService } from '../usuario/usuario.service';
import { PersonaService } from 'src/modules/persona-module/persona/persona.service';
import { TokenService } from 'src/common/services/token.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private hashService: HashService,
    private tokenService: TokenService,
    private usuarioService: UsuarioService
  ) { }

  async createMultiple(array: AuthDto[]): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    for (const element of array) {
      element.password = await this.hashService.hashText(element.password);
      element.pregunta = await this.hashService.hashText(element.pregunta);
      element.respuesta = await this.hashService.hashText(element.respuesta);
    }

    const result = await this.authRepository
      .createQueryBuilder()
      .insert()
      .into(Auth)
      .values(array)
      .execute();

    const rows = result.raw.affectedRows;

    serviceResult.boolean = rows > 0 ? true : false;
    serviceResult.message = rows > 0 ? rows + ' Auth(s) agregado(s).' : 'No se han agregado Auth.';
    serviceResult.number = rows;

    return serviceResult;
  }

  async create(authDto: AuthDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const usuario = authDto.usuario;

    // Verificar si auth es unico
    const busquedaAuth = await this.authRepository.findOne({ where: { usuario } });

    if (!busquedaAuth) {
      authDto.password = await this.hashService.hashText(authDto.password);
      authDto.pregunta = await this.hashService.hashText(authDto.pregunta);
      authDto.respuesta = await this.hashService.hashText(authDto.respuesta);

      const object = this.authRepository.create(authDto);
      await this.authRepository.save(object);

      serviceResult.boolean = true;
      serviceResult.message = 'Autenticación se ha agregado correctamente.';
      serviceResult.number = 1;
    } else {
      serviceResult.message = 'Ya existe un usuario.';
    }

    return serviceResult;
  }

  async findOne(usuario: string, password: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.authRepository.findOne({ where: { usuario } });

    if (result) {
      const compare = await this.hashService.compareTexts(password, result.password);

      if (compare) {
        const resultUsuario = await this.usuarioService.findOne(usuario);

        const payload = {
          ci: resultUsuario.object.ci,
          nombre: resultUsuario.object.nombre,
          apellido: resultUsuario.object.apellido
        };

        const objSend = this.tokenService.generateToken({ Usuario: resultUsuario.object });

        const userName = resultUsuario.object.persona.nombres + ' ' + resultUsuario.object.persona.apellidos;
        serviceResult.boolean = true;
        serviceResult.message = (resultUsuario.object.persona.nombres + ' ' + resultUsuario.object.persona.apellidos) + ' bienvenido al sistema.';
        serviceResult.number = 1;
        serviceResult.object = objSend;

      } else {
        serviceResult.message = 'Usuario y/o contraseña son incorrectos.';
      }
    } else {
      serviceResult.message = 'Usuario y/o contraseña son incorrectos.';
    }

    return serviceResult;
  }

  async update(usuario: string, updateAuthDto: UpdateAuthDto): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const resultUsuario = await this.authRepository.findOne({ where: { usuario } })

    if (resultUsuario) {
      const comparePregunta = await this.hashService.compareTexts(updateAuthDto.pregunta, resultUsuario.pregunta);
      const compareRespuesta = await this.hashService.compareTexts(updateAuthDto.respuesta, resultUsuario.respuesta);

      if (comparePregunta && compareRespuesta) {
        updateAuthDto.password = await this.hashService.hashText(updateAuthDto.password);

        const result = await this.authRepository.update(usuario, { password: updateAuthDto.password });

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Se ha modificado correctamente.' : 'No se ha modificado.';
        serviceResult.number = result.affected;
      }
    } else {
      serviceResult.boolean = false;
      serviceResult.message = 'No se ha encontrado al usuario: ' + usuario;
      return serviceResult;
    }

    return serviceResult;
  }

  async remove(usuario: string): Promise<ServiceResult> {
    let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

    const result = await this.authRepository.delete(usuario);

    serviceResult.boolean = result.affected === 1 ? true : false;
    serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Usuario.';
    serviceResult.number = result.affected;

    return serviceResult;
  }

}
