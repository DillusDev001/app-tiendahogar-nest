import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ComisionPagoService } from './comision-pago.service';
import { ComisionPagoDto } from './dto/comision-pago.dto';
import { UpdateComisionPagoDto } from './dto/update-comision-pago.dto';
import { ApiResult } from 'src/common/interfaces/api.result';
import { routeComisionPagoCreate, routeComisionPagoCreateMultiple, routeComisionPagoFindAll, routeComisionPagoFindBy, routeComisionPagoFindOne, routeComisionPagoRemove, routeComisionPagoUpdate } from 'src/common/routes/asesor-module/comision-pago.route';

@Controller('comision-pago')
export class ComisionPagoController {

  constructor(private readonly comisionPagoService: ComisionPagoService) { }

  @Post('/multiple')
  async createMultiple(@Body() array: ComisionPagoDto[]): Promise<ApiResult> {
    let apiResult = { title: routeComisionPagoCreateMultiple.title, route: routeComisionPagoCreateMultiple.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.comisionPagoService.createMultiple(array);

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
  async create(@Body() comisionPagoDto: ComisionPagoDto): Promise<ApiResult> {
    let apiResult = { title: routeComisionPagoCreate.title, route: routeComisionPagoCreate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.comisionPagoService.create(comisionPagoDto);

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

  @Get(':cod_contrato/:ci_asesor')
  async findOne(@Param('cod_contrato') cod_contrato: string, @Param('ci_asesor') ci_asesor: string): Promise<ApiResult> {
    let apiResult = { title: routeComisionPagoFindOne.title, route: routeComisionPagoFindOne.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.comisionPagoService.findOne(cod_contrato, ci_asesor);

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

  @Get('/all/:attribute/:orderBy')
  async findAll(@Param('attribute') attribute: string, @Param('orderBy') orderBy: string): Promise<ApiResult> {
    let apiResult = { title: routeComisionPagoFindAll.title, route: routeComisionPagoFindAll.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.comisionPagoService.findAll(attribute, orderBy as 'ASC' | 'DESC');

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

  @Get('/find-by/:attribute/:value/:orderBy')
  async findBy(@Param('attribute') attribute: string, @Param('value') value: string, @Param('orderBy') orderBy: string): Promise<ApiResult> {
    let apiResult = { title: routeComisionPagoFindBy.title, route: routeComisionPagoFindBy.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.comisionPagoService.findBy(attribute, value, orderBy as 'ASC' | 'DESC');

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

  @Patch(':cod_contrato/:ci_asesor')
  async update(@Param('cod_contrato') cod_contrato: string, @Param('ci_asesor')ci_asesor: string, @Body() updateComisionPagoDto: UpdateComisionPagoDto): Promise<ApiResult> {
    let apiResult = { title: routeComisionPagoUpdate.title, route: routeComisionPagoUpdate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.comisionPagoService.update(cod_contrato, ci_asesor, updateComisionPagoDto);

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

  @Delete(':cod_contrato/:ci_asesor')
  async remove(@Param('cod_contrato') cod_contrato: string, @Param('ci_asesor')ci_asesor: string): Promise<ApiResult> {
    let apiResult = { title: routeComisionPagoRemove.title, route: routeComisionPagoRemove.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.comisionPagoService.remove(cod_contrato, ci_asesor);

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