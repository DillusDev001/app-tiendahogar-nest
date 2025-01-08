import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ContratoGrupoService } from './contrato-grupo.service';
import { ContratoGrupoDto } from './dto/contrato-grupo.dto';
import { UpdateContratoGrupoDto } from './dto/update-contrato-grupo.dto';
import { routeContratoGrupoCreate, routeContratoGrupoCreateMultiple, routeContratoGrupoFindAll, routeContratoGrupoFindBy, routeContratoGrupoFindOne, routeContratoGrupoRemove, routeContratoGrupoUpdate } from 'src/common/routes/contrato-module/contrato-grupo.route';
import { ApiResult } from 'src/common/interfaces/api.result';

@Controller('contrato-grupo')
export class ContratoGrupoController {

  constructor(private readonly contratoGrupoService: ContratoGrupoService) { }

  @Post('/multiple')
  async createMultiple(@Body() array: ContratoGrupoDto[]): Promise<ApiResult> {
    let apiResult = { title: routeContratoGrupoCreateMultiple.title, route: routeContratoGrupoCreateMultiple.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.contratoGrupoService.createMultiple(array);

      if (result.boolean) {
        apiResult.status = 'correct';
        apiResult.code = HttpStatus.OK;
        apiResult.message = result.message;
        apiResult.boolean = true;
        apiResult.rows = result.number
      } else {
        apiResult.code = HttpStatus.BAD_REQUEST;
        apiResult.message = result.message;
      }
    } catch (error) {
      apiResult.code = error.status;
      apiResult.message = error;
    }

    return apiResult;
  }

  @Post()
  async create(@Body() contratoGrupoDto: ContratoGrupoDto): Promise<ApiResult> {
    let apiResult = { title: routeContratoGrupoCreate.title, route: routeContratoGrupoCreate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.contratoGrupoService.create(contratoGrupoDto);

      if (result.boolean) {
        apiResult.status = 'correct';
        apiResult.code = HttpStatus.OK;
        apiResult.message = result.message;
        apiResult.boolean = true;
      } else {
        apiResult.code = HttpStatus.BAD_REQUEST;
        apiResult.message = result.message;
        apiResult.data = [result.object]
      }
    } catch (error) {
      apiResult.code = error.status;
      apiResult.message = error;
    }

    return apiResult;
  }

  @Get('/all/:cod_contrato')
  async findAll(@Param('cod_contrato') cod_contrato: string): Promise<ApiResult> {
    let apiResult = { title: routeContratoGrupoFindAll.title, route: routeContratoGrupoFindAll.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.contratoGrupoService.findAll(cod_contrato);

      if (result.boolean) {
        apiResult.status = 'correct';
        apiResult.code = HttpStatus.OK;
        apiResult.message = result.message;
        apiResult.boolean = true;
        apiResult.rows = result.number;
        apiResult.data = result.data;
      } else {
        apiResult.code = HttpStatus.BAD_REQUEST;
        apiResult.message = result.message;
      }
    } catch (error) {
      apiResult.code = error.status;
      apiResult.message = error;
    }

    return apiResult;
  }

  @Patch(':cod_contrato/:ci/:sec')
  async update(
    @Param('cod_contrato') cod_contrato: string,
    @Param('cod_contrato') ci: string,
    @Param('cod_contrato') sec: number,
    @Body() updateContratoGrupoDto: UpdateContratoGrupoDto
  ): Promise<ApiResult> {
    let apiResult = { title: routeContratoGrupoUpdate.title, route: routeContratoGrupoUpdate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.contratoGrupoService.update(cod_contrato, ci, sec, updateContratoGrupoDto);

      if (result.boolean) {
        apiResult.status = 'correct';
        apiResult.code = HttpStatus.OK;
        apiResult.message = result.message;
        apiResult.boolean = true;
      } else {
        apiResult.code = HttpStatus.BAD_REQUEST;
        apiResult.message = result.message;
      }
    } catch (error) {
      apiResult.code = error.status;
      apiResult.message = error;
    }

    return apiResult;
  }

  @Delete(':cod_contrato/:ci/:sec')
  async remove(
    @Param('cod_contrato') cod_contrato: string,
    @Param('ci') ci: string,
    @Param('sec') sec: number,
  ): Promise<ApiResult> {
    let apiResult = { title: routeContratoGrupoRemove.title, route: routeContratoGrupoRemove.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.contratoGrupoService.remove(cod_contrato, ci, sec);

      if (result.boolean) {
        apiResult.status = 'correct';
        apiResult.code = HttpStatus.OK;
        apiResult.message = result.message;
        apiResult.boolean = true;
        apiResult.data = [result.object]
      } else {
        apiResult.code = HttpStatus.BAD_REQUEST;
        apiResult.message = result.message;
      }
    } catch (error) {
      apiResult.code = error.status;
      apiResult.message = error;
    }

    return apiResult;
  }

}
