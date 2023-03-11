import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { OfficesService } from '../offices/offices.service';
import { Office } from '../offices/office.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Office])],
  controllers: [CarsController],
  providers: [CarsService, OfficesService],
})
export class CarsModule {}
