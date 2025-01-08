import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { BeneficiarioService } from './beneficiario.service';
import { BeneficiarioDto } from './dto/beneficiario.dto';
import { UpdateBeneficiarioDto } from './dto/update-beneficiario.dto';
import { ApiResult } from 'src/common/interfaces/api.result';
import { routeBeneficiarioCreate, routeBeneficiarioCreateMultiple, routeBeneficiarioFindAll, routeBeneficiarioFindBy, routeBeneficiarioFindOne, routeBeneficiarioRemove, routeBeneficiarioUpdate } from 'src/common/routes/persona-module/beneficiario.route';

@Controller('beneficiario')
export class BeneficiarioController {

  constructor(private readonly beneficiarioService: BeneficiarioService) { }

  @Post('/multiple')
  async createMultiple(@Body() array: BeneficiarioDto[]): Promise<ApiResult> {
    let apiResult = { title: routeBeneficiarioCreateMultiple.title, route: routeBeneficiarioCreateMultiple.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.beneficiarioService.createMultiple(array);

      if (result.boolean) {
        apiResult.status = 'correct';
        apiResult.code = HttpStatus.OK;
        apiResult.message = result.message;
        apiResult.boolean = true;
        apiResult.rows = result.number;
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
  async create(@Body() beneficiarioDto: BeneficiarioDto): Promise<ApiResult> {
    let apiResult = { title: routeBeneficiarioCreate.title, route: routeBeneficiarioCreate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.beneficiarioService.create(beneficiarioDto);

      if (result.boolean) {
        apiResult.status = 'correct';
        apiResult.code = HttpStatus.OK;
        apiResult.message = result.message;
        apiResult.boolean = true;
      } else {
        apiResult.code = HttpStatus.BAD_REQUEST;
        apiResult.message = result.message;
        apiResult.data = [result.object];
      }
    } catch (error) {
      apiResult.code = error.status;
      apiResult.message = error;
    }

    return apiResult;
  }

  @Get(':ci')
  async findOne(@Param('ci') ci: string): Promise<ApiResult> {
    let apiResult = { title: routeBeneficiarioFindOne.title, route: routeBeneficiarioFindOne.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.beneficiarioService.findOne(ci);

      if (result.boolean) {
        apiResult.status = 'correct';
        apiResult.code = HttpStatus.OK;
        apiResult.message = result.message;
        apiResult.boolean = true;
        apiResult.rows = result.number;
        apiResult.data = [result.object];
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
    let apiResult = { title: routeBeneficiarioFindAll.title, route: routeBeneficiarioFindAll.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.beneficiarioService.findAll(attribute, orderBy as 'ASC' | 'DESC');

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
    let apiResult = { title: routeBeneficiarioFindBy.title, route: routeBeneficiarioFindBy.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.beneficiarioService.findBy(attribute, value, orderBy as 'ASC' | 'DESC');

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
  async update(@Param('ci') ci: string, @Body() updateBeneficiarioDto: UpdateBeneficiarioDto): Promise<ApiResult> {
    let apiResult = { title: routeBeneficiarioUpdate.title, route: routeBeneficiarioUpdate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.beneficiarioService.update(ci, updateBeneficiarioDto);

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
    let apiResult = { title: routeBeneficiarioRemove.title, route: routeBeneficiarioRemove.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.beneficiarioService.remove(ci);

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
