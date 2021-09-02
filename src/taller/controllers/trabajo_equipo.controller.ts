import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TrabajoEquipoService } from '../services/trabajo_equipo.service';
import { CreataTrabajoEquipoDto } from '../dto/create-trabajo_equipo.dto';

@Controller('trabajoEquipo')
export class TrabajoEquipoController {
  constructor(private trabajoEquipoService: TrabajoEquipoService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTrabajoEquipoDto: CreataTrabajoEquipoDto) {
    return this.trabajoEquipoService.create(createTrabajoEquipoDto);
  }

  @Get()
  findAll() {
    return this.trabajoEquipoService.findAll();
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() updateTrabajoEquipoDto: CreataTrabajoEquipoDto,
  ) {
    return this.trabajoEquipoService.update(+id, updateTrabajoEquipoDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.trabajoEquipoService.delete(+id);
  }
}
