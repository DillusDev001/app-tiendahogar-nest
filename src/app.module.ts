import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './modules/usuario-module/usuario/usuario.module';
import { AuthModule } from './modules/usuario-module/auth/auth.module';
import { PersonaModule } from './modules/persona-module/persona/persona.module';
import { BeneficiarioModule } from './modules/persona-module/beneficiario/beneficiario.module';
import { CuentaBancariaModule } from './modules/persona-module/cuenta-bancaria/cuenta-bancaria.module';
import { TipoCambioModule } from './modules/mantenimiento-module/tipo-cambio/tipo-cambio.module';
import { PaqueteModule } from './modules/mantenimiento-module/paquete/paquete.module';
import { ComisionModule } from './modules/mantenimiento-module/comision/comision.module';
import { AsesorModule } from './modules/asesor-module/asesor/asesor.module';
import { ComisionPagoModule } from './modules/asesor-module/comision-pago/comision-pago.module';
import { DepositanteModule } from './modules/depositante-module/depositante/depositante.module';
import { ContactoModule } from './modules/depositante-module/contacto/contacto.module';
import { ContratoModule } from './modules/contrato-module/contrato/contrato.module';
import { ContratoGrupoModule } from './modules/contrato-module/contrato-grupo/contrato-grupo.module';
import { ContratoDepositoModule } from './modules/contrato-module/contrato-deposito/contrato-deposito.module';
import { ContratoPlanDevolucionModule } from './modules/contrato-module/contrato-plan-devolucion/contrato-plan-devolucion.module';
import { RiesgoModule } from './modules/riesgo-module/riesgo/riesgo.module';
import { TokenService } from './common/services/token.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }), // para evitar el error en http://localhost:3000
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,

      autoLoadEntities: true,
      dropSchema: false,
      synchronize: false
    }), 

    ComisionModule, PaqueteModule, TipoCambioModule,
    AuthModule, UsuarioModule,
    BeneficiarioModule, CuentaBancariaModule, PersonaModule,
    AsesorModule, ComisionPagoModule,
    DepositanteModule, ContactoModule,
    ContratoModule, ContratoDepositoModule, ContratoGrupoModule, ContratoPlanDevolucionModule,
    RiesgoModule, 
  ],
  controllers: [AppController],
  providers: [AppService, TokenService],
})
export class AppModule {}
