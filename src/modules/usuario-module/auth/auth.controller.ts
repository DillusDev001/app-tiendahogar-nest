import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { routeAuthCreate, routeAuthCreateMultiple, routeAuthFindAll, routeAuthFindBy, routeAuthFindOne, routeAuthRemove, routeAuthUpdate } from 'src/common/routes/usuario-module/auth.route';
import { ApiResult } from 'src/common/interfaces/api.result';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('/multiple')
  async createMultiple(@Body() array: AuthDto[]): Promise<ApiResult> {
    let apiResult = { title: routeAuthCreateMultiple.title, route: routeAuthCreateMultiple.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.authService.createMultiple(array);

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
  async create(@Body() authDto: AuthDto): Promise<ApiResult> {
    let apiResult = { title: routeAuthCreate.title, route: routeAuthCreate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.authService.create(authDto);

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

  @Get(':usuario/:password')
  async findOne(@Param('usuario') usuario: string, @Param('password') password: string): Promise<ApiResult> {
    let apiResult = { title: routeAuthFindOne.title, route: routeAuthFindOne.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.authService.findOne(usuario, password);

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

  @Patch(':usuario')
  async update(@Param('usuario') usuario: string, @Body() updateAuthDto: UpdateAuthDto): Promise<ApiResult> {
    let apiResult = { title: routeAuthUpdate.title, route: routeAuthUpdate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.authService.update(usuario, updateAuthDto);

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

  @Delete(':usuario')
  async remove(@Param('usuario') usuario: string): Promise<ApiResult> {
    let apiResult = { title: routeAuthRemove.title, route: routeAuthRemove.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.authService.remove(usuario);

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
