import { TrabajadorService } from './../services/trabajador.service';
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
import { CreateTrabajadorDto } from '../dto/create-trabajador.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('trabajador')
export class TrabajadorController {
  constructor(private trabajadorService: TrabajadorService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTrabajadorDto: CreateTrabajadorDto) {
    return this.trabajadorService.create(createTrabajadorDto);
  }

  @Get()
  findAll() {
    return this.trabajadorService.findAll();
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() updateTrabajadorDto: CreateTrabajadorDto,
  ) {
    return this.trabajadorService.update(+id, updateTrabajadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trabajadorService.remove(+id);
  }
}
