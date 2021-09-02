import { TipoEquipoService } from './../services/tipo_equipo.service';
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
import { CreateTipoEquipoDto } from '../dto/create-tipo_equipo.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('tipoEquipo')
export class TipoEquipoController {
  constructor(private tipoEquipoService: TipoEquipoService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTipoEquipoDto: CreateTipoEquipoDto) {
    return this.tipoEquipoService.create(createTipoEquipoDto);
  }

  @Get()
  findAll() {
    return this.tipoEquipoService.findAll();
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() updateTipoEquipoDto: CreateTipoEquipoDto,
  ) {
    return this.tipoEquipoService.update(+id, updateTipoEquipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoEquipoService.remove(+id);
  }
}
