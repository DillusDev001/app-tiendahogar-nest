import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { DepositanteService } from './depositante.service';
import { DepositanteDto } from './dto/depositante.dto';
import { UpdateDepositanteDto } from './dto/update-depositante.dto';
import { ApiResult } from 'src/common/interfaces/api.result';
import { routeDepositanteCreate, routeDepositanteCreateMultiple, routeDepositanteFindAll, routeDepositanteFindBy, routeDepositanteFindOne, routeDepositanteRemove, routeDepositanteUpdate } from 'src/common/routes/depositante-module/depositante.route';

@Controller('depositante')
export class DepositanteController {
  
  constructor(private readonly depositanteService: DepositanteService) {}
  
  @Post('/multiple')
  async createMultiple(@Body() array: DepositanteDto[]): Promise<ApiResult> {
    let apiResult = { title: routeDepositanteCreateMultiple.title, route: routeDepositanteCreateMultiple.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.depositanteService.createMultiple(array);

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
  async create(@Body() depositanteDto: DepositanteDto): Promise<ApiResult> {
    let apiResult = { title: routeDepositanteCreate.title, route: routeDepositanteCreate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.depositanteService.create(depositanteDto);

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

  @Get(':ci')
  async findOne(@Param('ci') ci: string): Promise<ApiResult> {
    let apiResult = { title: routeDepositanteFindOne.title, route: routeDepositanteFindOne.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.depositanteService.findOne(ci);

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
    let apiResult = { title: routeDepositanteFindAll.title, route: routeDepositanteFindAll.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.depositanteService.findAll(attribute, orderBy as 'ASC' | 'DESC');

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
    let apiResult = { title: routeDepositanteFindBy.title, route: routeDepositanteFindBy.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.depositanteService.findBy(attribute, value, orderBy as 'ASC' | 'DESC');

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

  @Patch(':ci')
  async update(@Param('ci') ci: string, @Body() updateDepositanteDto: UpdateDepositanteDto): Promise<ApiResult> {
    let apiResult = { title: routeDepositanteUpdate.title, route: routeDepositanteUpdate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.depositanteService.update(ci, updateDepositanteDto);

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

  @Delete(':ci')
  async remove(@Param('ci') ci: string): Promise<ApiResult> {
    let apiResult = { title: routeDepositanteRemove.title, route: routeDepositanteRemove.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.depositanteService.remove(ci);

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
