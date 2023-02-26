import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(@InjectRepository(Car) private carRepository: Repository<Car>) {}
  async create(car: CreateCarDto): Promise<Car> {
    const newCar = this.carRepository.create(car);
    return this.carRepository.save(newCar);
  }

  async read(): Promise<{ result: Car[]; total: number }> {
    const [result, total] = await this.carRepository.findAndCount();

    return { result, total };
  }

  async getOneById(id: number): Promise<Car> {
    const car = await this.carRepository.findOneBy({ id });

    if (!car) {
      throw new NotFoundException('Car not found');
    }

    return car;
  }

  async update(id: number, data: UpdateCarDto): Promise<Car> {
    const car = await this.getOneById(id);

    if (!car) {
      throw new NotFoundException('Car not found');
    }

    await this.carRepository.save({
      id: car.id,
      ...data,
    });

    return this.getOneById(id);
  }

  async delete(id: number): Promise<{ success: boolean }> {
    const carToRemove = await this.getOneById(id);

    if (!carToRemove.id) {
      throw new NotFoundException('Car not found');
    }

    const { affected } = await this.carRepository.delete(id);

    return { success: !!affected };
  }
}
