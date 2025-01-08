import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ContratoDepositoService } from './contrato-deposito.service';
import { ContratoDepositoDto } from './dto/contrato-deposito.dto';
import { UpdateContratoDepositoDto } from './dto/update-contrato-deposito.dto';
import { ApiResult } from 'src/common/interfaces/api.result';
import { routeContratoDepositoCreate, routeContratoDepositoCreateMultiple, routeContratoDepositoFindAll, routeContratoDepositoFindBy, routeContratoDepositoFindOne, routeContratoDepositoRemove, routeContratoDepositoUpdate } from 'src/common/routes/contrato-module/contrato-deposito.route';

@Controller('contrato-deposito')
export class ContratoDepositoController {

  constructor(private readonly contratoDepositoService: ContratoDepositoService) { }

  @Post('/multiple')
  async createMultiple(@Body() array: ContratoDepositoDto[]): Promise<ApiResult> {
    let apiResult = { title: routeContratoDepositoCreateMultiple.title, route: routeContratoDepositoCreateMultiple.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.contratoDepositoService.createMultiple(array);

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
  async create(@Body() contratoDepositoDto: ContratoDepositoDto): Promise<ApiResult> {
    let apiResult = { title: routeContratoDepositoCreate.title, route: routeContratoDepositoCreate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.contratoDepositoService.create(contratoDepositoDto);

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

  @Get(':cod_contrato/:sec')
  async findOne(@Param('cod_contrato') cod_contrato: string, @Param('sec') sec: number): Promise<ApiResult> {
    let apiResult = { title: routeContratoDepositoFindOne.title, route: routeContratoDepositoFindOne.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.contratoDepositoService.findOne(cod_contrato, sec);

      if (result.boolean) {
        apiResult.status = 'correct';
        apiResult.code = HttpStatus.OK;
        apiResult.message = result.message;
        apiResult.boolean = true;
        apiResult.rows = result.number;
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

  /*@Get('/all/:attribute/:orderBy')
  async findAll(@Param('attribute') attribute: string, @Param('orderBy') orderBy: string): Promise<ApiResult> {
    let apiResult = { title: routeContratoDepositoFindAll.title, route: routeContratoDepositoFindAll.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.contratoDepositoService.findAll(attribute, orderBy as 'ASC' | 'DESC');

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
  }*/

  @Get('/find-by/:attribute/:value/:orderBy')
  async findBy(@Param('attribute') attribute: string, @Param('value') value: string, @Param('orderBy') orderBy: string): Promise<ApiResult> {
    let apiResult = { title: routeContratoDepositoFindBy.title, route: routeContratoDepositoFindBy.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.contratoDepositoService.findBy(attribute, value, orderBy as 'ASC' | 'DESC');

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

  @Patch(':cod_contrato/:sec')
  async update(@Param('cod_contrato') cod_contrato: string, @Param('sec') sec: number, @Body() updateContratoDepositoDto: UpdateContratoDepositoDto): Promise<ApiResult> {
    let apiResult = { title: routeContratoDepositoUpdate.title, route: routeContratoDepositoUpdate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.contratoDepositoService.update(cod_contrato, sec, updateContratoDepositoDto);

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

  @Delete(':cod_contrato/:sec')
  async remove(@Param('cod_contrato') cod_contrato: string, @Param('sec') sec: number): Promise<ApiResult> {
    let apiResult = { title: routeContratoDepositoRemove.title, route: routeContratoDepositoRemove.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.contratoDepositoService.remove(cod_contrato, sec);

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
