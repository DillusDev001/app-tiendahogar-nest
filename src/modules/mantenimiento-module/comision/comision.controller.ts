import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ComisionService } from './comision.service';
import { ComisionDto } from './dto/comision.dto';
import { UpdateComisionDto } from './dto/update-comision.dto';
import { ApiResult } from 'src/common/interfaces/api.result';
import { routeComisionCreate, routeComisionCreateMultiple, routeComisionFindAll, routeComisionFindBy, routeComisionFindOne, routeComisionRemove, routeComisionUpdate } from 'src/common/routes/mantenimiento-module/comision.route';

@Controller('comision')
export class ComisionController {
  
  constructor(private readonly comisionService: ComisionService) {}
  
  @Post('/multiple')
  async createMultiple(@Body() array: ComisionDto[]): Promise<ApiResult> {
    let apiResult = { title: routeComisionCreateMultiple.title, route: routeComisionCreateMultiple.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.comisionService.createMultiple(array);

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
  async create(@Body() comisionDto: ComisionDto): Promise<ApiResult> {
    let apiResult = { title: routeComisionCreate.title, route: routeComisionCreate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.comisionService.create(comisionDto);

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

  @Get(':id_comision')
  async findOne(@Param('id_comision') id_comision: number): Promise<ApiResult> {
    let apiResult = { title: routeComisionFindOne.title, route: routeComisionFindOne.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.comisionService.findOne(id_comision);

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
    let apiResult = { title: routeComisionFindAll.title, route: routeComisionFindAll.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.comisionService.findAll(attribute, orderBy as 'ASC' | 'DESC');

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
    let apiResult = { title: routeComisionFindBy.title, route: routeComisionFindBy.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.comisionService.findBy(attribute, value, orderBy as 'ASC' | 'DESC');

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

  @Patch(':id_comision')
  async update(@Param('id_comision') id_comision: number, @Body() updateComisionDto: UpdateComisionDto): Promise<ApiResult> {
    let apiResult = { title: routeComisionUpdate.title, route: routeComisionUpdate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.comisionService.update(id_comision, updateComisionDto);

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

  @Delete(':id_comision')
  async remove(@Param('id_comision') id_comision: number): Promise<ApiResult> {
    let apiResult = { title: routeComisionRemove.title, route: routeComisionRemove.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.comisionService.remove(id_comision);

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
