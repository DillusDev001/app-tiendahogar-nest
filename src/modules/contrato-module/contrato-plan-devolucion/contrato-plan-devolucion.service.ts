import { Injectable } from '@nestjs/common';
import { ContratoPlanDevolucionDto } from './dto/contrato-plan-devolucion.dto';
import { UpdateContratoPlanDevolucionDto } from './dto/update-contrato-plan-devolucion.dto';
import { ContratoPlanDevolucion } from './entities/contrato-plan-devolucion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonaService } from 'src/modules/persona-module/persona/persona.service';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class ContratoPlanDevolucionService {

    constructor(
        @InjectRepository(ContratoPlanDevolucion) private contratoPlanDevolucionRepository: Repository<ContratoPlanDevolucion>,
        private personaService: PersonaService
    ) { }

    async createMultiple(array: ContratoPlanDevolucionDto[]): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.contratoPlanDevolucionRepository
            .createQueryBuilder()
            .insert()
            .into(ContratoPlanDevolucion)
            .values(array)
            .execute();

        const rows = result.raw.affectedRows;

        serviceResult.boolean = rows > 0 ? true : false;
        serviceResult.message = rows > 0 ? rows + ' ContratoPlanDevolucion(s) agregado(s).' : 'No se han agregado ContratoPlanDevolucion.';
        serviceResult.number = rows;

        return serviceResult;
    }

    async create(contratoPlanDevolucionDto: ContratoPlanDevolucionDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const object = this.contratoPlanDevolucionRepository.create(contratoPlanDevolucionDto);
        await this.contratoPlanDevolucionRepository.save(object);

        serviceResult.boolean = true;
        serviceResult.message = 'Pago(s) de devolución se ha agregado correctamente.';
        serviceResult.number = 1;

        return serviceResult;
    }

    async findOne(cod_contrato: string, sec: number): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.contratoPlanDevolucionRepository.findOne({ where: { cod_contrato, sec } });

        if (result) {
            const personaResult = await this.personaService.findOne(result.ci_devolucion);
            result['persona'] = personaResult.boolean ? personaResult.object : null;

            serviceResult.boolean = true;
            serviceResult.message = 'Existe un Pago de devolución.';
            serviceResult.number = 1;
            serviceResult.object = result
        } else {
            serviceResult.message = 'No existe Pago de devolución.';
        }

        return serviceResult;
    }

    async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        //const whereCondition = { [attribute]: attribute}
        const orderCondition = { [attribute]: orderBy };

        const result = await this.contratoPlanDevolucionRepository.find({ order: orderCondition });

        const count = result.length;

        if (count > 0) {
            const updatedResult = await Promise.all(
                result.map(async (item) => {
                    const resultPersona = await this.personaService.findOne(item.ci_devolucion);
                    item['persona'] = resultPersona.boolean ? resultPersona.object : null;
                    return item; // Devuelve el item actualizado
                })
            );

            serviceResult.data = updatedResult;
        }

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Pago(s) de devolución encontrado(s).';
        serviceResult.number = count;

        return serviceResult;
    }

    async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.contratoPlanDevolucionRepository
            .createQueryBuilder()
            .orderBy(attribute, orderBy)
            .where(attribute + ' like :value', { value: '%' + value + '%' })
            //.andWhere(estado = 1)
            .getMany()

        const count = result.length;

        if (count > 0) {
            const updatedResult = await Promise.all(
                result.map(async (item) => {
                    const resultPersona = await this.personaService.findOne(item.ci_devolucion);
                    item['persona'] = resultPersona.boolean ? resultPersona.object : null;
                    return item; // Devuelve el item actualizado
                })
            );

            serviceResult.data = updatedResult;
        }

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Pago(s) de devolución encontrado(s).';
        serviceResult.number = count;

        return serviceResult;
    }

    async update(cod_contrato: string, sec: number, updateContratoPlanDevolucionDto: UpdateContratoPlanDevolucionDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.contratoPlanDevolucionRepository.update({ cod_contrato, sec }, updateContratoPlanDevolucionDto);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = 'Se ha actualizado correctamente.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

    async remove(cod_contrato: string, sec: number): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.contratoPlanDevolucionRepository.delete({ cod_contrato, sec });

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Pagos de devolución.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

}