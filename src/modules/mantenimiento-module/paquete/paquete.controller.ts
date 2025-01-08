import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { PaqueteService } from './paquete.service';
import { PaqueteDto } from './dto/paquete.dto';
import { UpdatePaqueteDto } from './dto/update-paquete.dto';
import { ApiResult } from 'src/common/interfaces/api.result';
import { routePaqueteCreate, routePaqueteCreateMultiple, routePaqueteFindAll, routePaqueteFindBy, routePaqueteFindOne, routePaqueteRemove, routePaqueteUpdate } from 'src/common/routes/mantenimiento-module/paquete.route';

@Controller('paquete')
export class PaqueteController {

  constructor(private readonly paqueteService: PaqueteService) { }

  @Post('/multiple')
  async createMultiple(@Body() array: PaqueteDto[]): Promise<ApiResult> {
    let apiResult = { title: routePaqueteCreateMultiple.title, route: routePaqueteCreateMultiple.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.paqueteService.createMultiple(array);

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
  async create(@Body() paqueteDto: PaqueteDto): Promise<ApiResult> {
    let apiResult = { title: routePaqueteCreate.title, route: routePaqueteCreate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.paqueteService.create(paqueteDto);

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

  @Get(':id_paquete')
  async findOne(@Param('id_paquete') id_paquete: number): Promise<ApiResult> {
    let apiResult = { title: routePaqueteFindOne.title, route: routePaqueteFindOne.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.paqueteService.findOne(id_paquete);

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
    let apiResult = { title: routePaqueteFindAll.title, route: routePaqueteFindAll.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.paqueteService.findAll(attribute, orderBy as 'ASC' | 'DESC');

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
    let apiResult = { title: routePaqueteFindBy.title, route: routePaqueteFindBy.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.paqueteService.findBy(attribute, value, orderBy as 'ASC' | 'DESC');

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

  @Patch(':id_paquete')
  async update(@Param('id_paquete') id_paquete: number, @Body() updatePaqueteDto: UpdatePaqueteDto): Promise<ApiResult> {
    let apiResult = { title: routePaqueteUpdate.title, route: routePaqueteUpdate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.paqueteService.update(id_paquete, updatePaqueteDto);

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

  @Delete(':id_paquete')
  async remove(@Param('id_paquete') id_paquete: number): Promise<ApiResult> {
    let apiResult = { title: routePaqueteRemove.title, route: routePaqueteRemove.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.paqueteService.remove(id_paquete);

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
