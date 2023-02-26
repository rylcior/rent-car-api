import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CarsModule } from './cars/cars.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CarsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/my-db.sqlite3',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
