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
import { OfficesService } from './offices.service';
import { CreateOfficeDto } from './dto/create-office.dto';
import { of } from 'rxjs';
import { UpdateOfficeDto } from './dto/update-office.dto';

@Controller('offices')
export class OfficesController {
  private officesService: OfficesService;

  constructor(officesService: OfficesService) {
    this.officesService = officesService;
  }

  @Post()
  createOffice(@Body() office: CreateOfficeDto) {
    return this.officesService.create(office);
  }

  @Get()
  readAll() {
    return this.officesService.read();
  }

  @Get(':id')
  readOne(@Param('id', ParseIntPipe) officeId: number) {
    return this.officesService.getOneById(officeId);
  }

  @Patch(':id')
  updateOne(
    @Param('id', ParseIntPipe) officeId: number,
    @Body() office: UpdateOfficeDto,
  ) {
    return this.officesService.update(officeId, office);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) officeId: number) {
    return this.officesService.delete(officeId);
  }
}
