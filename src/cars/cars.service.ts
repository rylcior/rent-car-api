import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { UpdateCarDto } from './dto/update-car.dto';
import { OfficesService } from '../offices/offices.service';

@Injectable()
export class CarsService {
  private officesService: OfficesService;
  constructor(
    @InjectRepository(Car) private carRepository: Repository<Car>,
    @Inject(forwardRef(() => OfficesService)) officesService: OfficesService,
  ) {
    this.officesService = officesService;
  }
  async create(car: CreateCarDto): Promise<Car> {
    const office = await this.officesService.getOneById(car.officeId);

    if (!office) {
      throw new NotFoundException('Office not found');
    }

    return this.carRepository.save({ ...car, office });
  }

  async read(): Promise<{ result: Car[]; total: number }> {
    const [result, total] = await this.carRepository.findAndCount({
      relations: {
        office: true,
      },
    });

    return { result, total };
  }

  async getOneById(id: number): Promise<Car> {
    const car = await this.carRepository.findOne({
      where: { id: Equal(id) },
      relations: {
        office: true,
      },
    });

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

    const office =
      data?.officeId && (await this.officesService.getOneById(data.officeId));

    await this.carRepository.save({
      id: car.id,
      office: office || car.office,
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
