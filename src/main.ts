import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Cors access allowed
  app.use(json({ limit: '60mb' })); // Tamaño limite admitido

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI
  }); // Para la version del código http://localhost:3000/v1/ENDPOINT

  const config = new DocumentBuilder()
    .addBearerAuth() // Autenticacion por token 
    .setTitle('Documentacion API NestJS TiendaHogar')
    .setDescription('TiendaHogar Api Documentation')
    .setVersion('1.0')

    
    .addTag('TipoCambio') .addTag('Paquete') .addTag('Comision')
    .addTag('Persona') .addTag('CuentaBancaria') .addTag('Beneficiario')
    .addTag('Usuario') .addTag('Auth')
    .addTag('Depositante') .addTag('Contacto')
    .addTag('Contrato') .addTag('ContratoGrupo') .addTag('ContratoDeposito') .addTag('ContratoPlanDevolucion')
    .addTag('Asesor') .addTag('ComisionPago')
    .addTag('Riesgo')


    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(parseInt(process.env.API_PORT));
}
bootstrap();
