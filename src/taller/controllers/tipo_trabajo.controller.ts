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
import { ValidationPipe } from '@nestjs/common';
import { CreateTipoTrabajoDto } from '../dto/create-tipo_trabajo.dto';
import { TipoTrabajoService } from '../services/tipo_trabajo.service';

@Controller('tipoTrabajo')
export class TipoTrabajoController {
  constructor(private tipoTrabajoService: TipoTrabajoService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTipoTrabajoDto: CreateTipoTrabajoDto) {
    return this.tipoTrabajoService.create(createTipoTrabajoDto);
  }

  @Get()
  findAll() {
    return this.tipoTrabajoService.findAll();
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() updateTipoTrabajoDto: CreateTipoTrabajoDto,
  ) {
    return this.tipoTrabajoService.update(+id, updateTipoTrabajoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoTrabajoService.remove(+id);
  }
}
