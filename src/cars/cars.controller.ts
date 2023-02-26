import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { CarsService } from './cars.service';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
  private carsService: CarsService;

  constructor(carsService: CarsService) {
    this.carsService = carsService;
  }
  @Post()
  createCar(@Body() car: CreateCarDto) {
    return this.carsService.create(car);
  }

  @Get()
  readAll() {
    return this.carsService.read();
  }

  @Get(':id')
  readOne(@Param('id', ParseIntPipe) carId: number) {
    return this.carsService.getOneById(carId);
  }

  @Patch(':id')
  updateOne(
    @Param('id', ParseIntPipe) carId: number,
    @Body() car: UpdateCarDto,
  ) {
    return this.carsService.update(carId, car);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) carId: number) {
    return this.carsService.delete(carId);
  }
}
