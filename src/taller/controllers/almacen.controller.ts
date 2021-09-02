import { AlmacenService } from './../services/almacen.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateAlmacenDto } from '../dto/create-almacen.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('almacen')
export class AlmacenController {
  constructor(private almacenService: AlmacenService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createAlmacenDto: CreateAlmacenDto) {
    return this.almacenService.create(createAlmacenDto);
  }

  @Get()
  findAll() {
    return this.almacenService.findAll();
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateAlmacenDto: CreateAlmacenDto) {
    return this.almacenService.update(+id, updateAlmacenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.almacenService.remove(+id);
  }
}
