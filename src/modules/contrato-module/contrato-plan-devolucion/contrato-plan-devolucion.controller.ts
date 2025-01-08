import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ContratoPlanDevolucionService } from './contrato-plan-devolucion.service';
import { ContratoPlanDevolucionDto } from './dto/contrato-plan-devolucion.dto';
import { UpdateContratoPlanDevolucionDto } from './dto/update-contrato-plan-devolucion.dto';
import { ApiResult } from 'src/common/interfaces/api.result';
import { routeContratoPlanDevolucionCreate, routeContratoPlanDevolucionCreateMultiple, routeContratoPlanDevolucionFindAll, routeContratoPlanDevolucionFindBy, routeContratoPlanDevolucionFindOne, routeContratoPlanDevolucionRemove, routeContratoPlanDevolucionUpdate } from 'src/common/routes/contrato-module/contrato-plan-devolucion.route';

@Controller('contrato-plan-devolucion')
export class ContratoPlanDevolucionController {

  constructor(private readonly contratoPlanDevolucionService: ContratoPlanDevolucionService) { }

  @Post('/multiple')
  async createMultiple(@Body() array: ContratoPlanDevolucionDto[]): Promise<ApiResult> {
    let apiResult = { title: routeContratoPlanDevolucionCreateMultiple.title, route: routeContratoPlanDevolucionCreateMultiple.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.contratoPlanDevolucionService.createMultiple(array);

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
  async create(@Body() contratoPlanDevolucionDto: ContratoPlanDevolucionDto): Promise<ApiResult> {
    let apiResult = { title: routeContratoPlanDevolucionCreate.title, route: routeContratoPlanDevolucionCreate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.contratoPlanDevolucionService.create(contratoPlanDevolucionDto);

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
    let apiResult = { title: routeContratoPlanDevolucionFindOne.title, route: routeContratoPlanDevolucionFindOne.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.contratoPlanDevolucionService.findOne(cod_contrato, sec);

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
    let apiResult = { title: routeContratoPlanDevolucionFindAll.title, route: routeContratoPlanDevolucionFindAll.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.contratoPlanDevolucionService.findAll(attribute, orderBy as 'ASC' | 'DESC');

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
    let apiResult = { title: routeContratoPlanDevolucionFindBy.title, route: routeContratoPlanDevolucionFindBy.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.contratoPlanDevolucionService.findBy(attribute, value, orderBy as 'ASC' | 'DESC');

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
  async update(
    @Param('cod_contrato') cod_contrato: string, @Param('sec') sec: number,
    @Body() updateContratoPlanDevolucionDto: UpdateContratoPlanDevolucionDto): Promise<ApiResult> {
    let apiResult = { title: routeContratoPlanDevolucionUpdate.title, route: routeContratoPlanDevolucionUpdate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.contratoPlanDevolucionService.update(cod_contrato, sec, updateContratoPlanDevolucionDto);

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
  async remove(@Param('cod_contrato') cod_contrato: string, @Param('sec') sec: number,): Promise<ApiResult> {
    let apiResult = { title: routeContratoPlanDevolucionRemove.title, route: routeContratoPlanDevolucionRemove.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.contratoPlanDevolucionService.remove(cod_contrato, sec);

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
