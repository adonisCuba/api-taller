import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RecepcionService } from '../services/recepcion.service';
import { CreateRecepcionDto } from '../dto/create-recepcion.dto';
import { FilterRecepcionDto } from '../dto/filter-recepcion.dto';

@Controller('/recepcion')
export class RecepcioEquipoController {
  constructor(private recepcionService: RecepcionService) {}
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createRecepcionDto: CreateRecepcionDto) {
    return this.recepcionService.create(createRecepcionDto);
  }

  @Get()
  @UsePipes(ValidationPipe)
  find(@Query() filter: FilterRecepcionDto) {
    return this.recepcionService.findByFilter(filter);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() updateRecepcionDto: CreateRecepcionDto,
  ) {
    return this.recepcionService.update(id, updateRecepcionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recepcionService.remove(id);
  }
}
