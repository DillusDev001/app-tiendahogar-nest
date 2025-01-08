import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { TipoCambioService } from './tipo-cambio.service';
import { TipoCambioDto } from './dto/tipo-cambio.dto';
import { UpdateTipoCambioDto } from './dto/update-tipo-cambio.dto';
import { ApiResult } from 'src/common/interfaces/api.result';
import { routeTipoCambioCreate, routeTipoCambioCreateMultiple, routeTipoCambioFindAll, routeTipoCambioFindBy, routeTipoCambioFindOne, routeTipoCambioRemove, routeTipoCambioUpdate } from 'src/common/routes/mantenimiento-module/tipo-cambio.route';

@Controller('tipo-cambio')
export class TipoCambioController {

  constructor(private readonly tipoCambioService: TipoCambioService) { }

  @Post('/multiple')
  async createMultiple(@Body() array: TipoCambioDto[]): Promise<ApiResult> {
    let apiResult = { title: routeTipoCambioCreateMultiple.title, route: routeTipoCambioCreateMultiple.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.tipoCambioService.createMultiple(array);

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
  async create(@Body() tipoCambioDto: TipoCambioDto): Promise<ApiResult> {
    let apiResult = { title: routeTipoCambioCreate.title, route: routeTipoCambioCreate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.tipoCambioService.create(tipoCambioDto);

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

  @Get(':moneda')
  async findOne(@Param('moneda') moneda: string): Promise<ApiResult> {
    let apiResult = { title: routeTipoCambioFindOne.title, route: routeTipoCambioFindOne.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.tipoCambioService.findOne(moneda);

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

  @Get('/all/:orderBy')
  async findAll(@Param('orderBy') orderBy: string): Promise<ApiResult> {
    let apiResult = { title: routeTipoCambioFindAll.title, route: routeTipoCambioFindAll.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.tipoCambioService.findAll(orderBy as 'ASC' | 'DESC');

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
    let apiResult = { title: routeTipoCambioFindBy.title, route: routeTipoCambioFindBy.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.tipoCambioService.findBy(attribute, value, orderBy as "ASC" | "DESC");

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

  @Patch(':moneda')
  async update(@Param('moneda') moneda: string, @Body() updateTipoCambioDto: UpdateTipoCambioDto): Promise<ApiResult> {
    let apiResult = { title: routeTipoCambioUpdate.title, route: routeTipoCambioUpdate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.tipoCambioService.update(moneda, updateTipoCambioDto);

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

  @Delete(':moneda')
  async remove(@Param('moneda') moneda: string): Promise<ApiResult> {
    let apiResult = { title: routeTipoCambioRemove.title, route: routeTipoCambioRemove.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.tipoCambioService.remove(moneda);

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

}
