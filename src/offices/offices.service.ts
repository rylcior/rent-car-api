import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Office } from './office.entity';
import { Equal, Repository } from 'typeorm';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';

@Injectable()
export class OfficesService {
  constructor(
    @InjectRepository(Office) private officeRepository: Repository<Office>,
  ) {}

  async create(office: CreateOfficeDto): Promise<Office> {
    const newOffice = this.officeRepository.create(office);
    return this.officeRepository.save(newOffice);
  }

  async read(): Promise<{ result: Office[]; total: number }> {
    const [result, total] = await this.officeRepository.findAndCount({
      relations: {
        cars: true,
      },
    });

    return { result, total };
  }

  async getOneById(id: number): Promise<Office> {
    const office = await this.officeRepository.findOne({
      where: { id: Equal(id) },
      relations: {
        cars: true,
      },
    });

    if (!office) {
      throw new NotFoundException('Office not found');
    }

    return office;
  }

  async update(id: number, data: UpdateOfficeDto): Promise<Office> {
    const office = await this.getOneById(id);

    if (!office) {
      throw new NotFoundException('Office not found');
    }

    await this.officeRepository.save({
      id: office.id,
      ...data,
    });

    return this.getOneById(id);
  }

  async delete(id: number): Promise<{ success: boolean }> {
    const officeToRemove = await this.getOneById(id);

    if (!officeToRemove) {
      throw new NotFoundException('Office not found');
    }

    const { affected } = await this.officeRepository.delete(id);

    return { success: !!affected };
  }
}
