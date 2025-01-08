import { Injectable } from '@nestjs/common';
import { ContratoDto } from './dto/contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { Contrato } from './entities/contrato.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceResult } from 'src/common/interfaces/service.result';
import { PaqueteService } from 'src/modules/mantenimiento-module/paquete/paquete.service';

@Injectable()
export class ContratoService {

    constructor(
        @InjectRepository(Contrato) private contratoRepository: Repository<Contrato>,
        private paqueteService: PaqueteService
    ) { }

    async createMultiple(array: ContratoDto[]): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.contratoRepository
            .createQueryBuilder()
            .insert()
            .into(Contrato)
            .values(array)
            .execute();

        const rows = result.raw.affectedRows;

        serviceResult.boolean = rows > 0 ? true : false;
        serviceResult.message = rows > 0 ? rows + ' Contrato(s) agregado(s).' : 'No se han agregado Contratos.';
        serviceResult.number = rows;

        return serviceResult;
    }

    async create(contratoDto: ContratoDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const object = this.contratoRepository.create(contratoDto);
        await this.contratoRepository.save(object);

        serviceResult.boolean = true;
        serviceResult.message = 'Contrato se ha agregado correctamente.';
        serviceResult.number = 1;

        return serviceResult;
    }

    async findOne(cod_contrato: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.contratoRepository.findOne({ where: { cod_contrato } });

        if (result) {
            const personaResult = await this.paqueteService.findOne(result.id_paquete);

            if (personaResult.boolean) {
                result['paquete'] = personaResult.object
            } else {
                result['paquete'] = null
            }

            serviceResult.boolean = true;
            serviceResult.message = 'Contrato encontrado.';
            serviceResult.number = 1;
            serviceResult.object = result
        } else {
            serviceResult.message = 'No existe Contrato.';
        }

        return serviceResult;
    }

    async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const orderCondition = { [attribute]: orderBy };

        const result = await this.contratoRepository.find({ order: orderCondition });

        const count = result.length;

        if (count > 0) {
            const updatedResult = await Promise.all(
                result.map(async (item) => {
                    const resultAsesor = await this.paqueteService.findOne(item.id_paquete);
                    item['paquete'] = resultAsesor.boolean ? resultAsesor.object : null;
                    return item; // Devuelve el item actualizado
                })
            );

            serviceResult.data = updatedResult;
        }

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Contrato(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.contratoRepository
            .createQueryBuilder()
            .orderBy(attribute, orderBy)
            .where(attribute + ' like :value', { value: '%' + value + '%' })
            //.andWhere(estado = 1)
            .getMany()

        const count = result.length;

        if (count > 0) {
            const updatedResult = await Promise.all(
                result.map(async (item) => {
                    const resultAsesor = await this.paqueteService.findOne(item.id_paquete);
                    item['paquete'] = resultAsesor.boolean ? resultAsesor.object : null;
                    return item; // Devuelve el item actualizado
                })
            );

            serviceResult.data = updatedResult;
        }

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Contrato(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async update(cod_contrato: string, updateContratoDto: UpdateContratoDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.contratoRepository.update(cod_contrato, updateContratoDto);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = 'Se ha actualizado correctamente.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

    async remove(cod_contrato: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.contratoRepository.delete(cod_contrato);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Contrato.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

}