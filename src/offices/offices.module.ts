import { Module } from '@nestjs/common';
import { OfficesController } from './offices.controller';
import { OfficesService } from './offices.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Office } from './office.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Office])],
  controllers: [OfficesController],
  providers: [OfficesService],
})
export class OfficesModule {}
