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
import { MercanciaService } from '../services/mercancia.service';
import { CreateMercanciaDto } from '../dto/create-mercancia.dto';
import { FilterMercanciaDto } from '../dto/filter-mercancia.dto';

@Controller('mercancia')
export class MercanciaController {
  constructor(private mercanciaService: MercanciaService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createMercanciaDto: CreateMercanciaDto) {
    return this.mercanciaService.create(createMercanciaDto);
  }

  @Get()
  @UsePipes(ValidationPipe)
  find(@Param() filter: FilterMercanciaDto) {
    return this.mercanciaService.findByFilter(filter);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() updateMercanciaDto: CreateMercanciaDto,
  ) {
    return this.mercanciaService.update(+id, updateMercanciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mercanciaService.remove(+id);
  }
}
