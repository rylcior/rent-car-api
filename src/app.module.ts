import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CarsModule } from './cars/cars.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { databaseConfig } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/envValidation.config';
import { OfficesModule } from './offices/offices.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    CarsModule,
    TypeOrmModule.forRootAsync(databaseConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      validationSchema: envValidationSchema,
    }),
    AuthModule,
    OfficesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
