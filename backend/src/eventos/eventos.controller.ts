import { Controller, Get, Post, Body, Patch, Delete, BadRequestException, Param } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Get()
  listarEventos(){
    return this.eventosService.listarEventos();
  }

  @Get('buscarPorID/:id')
  buscarPorId(@Param('id') id: string) {
    const idNumero = Number(id);

    if (Number.isNaN(idNumero)) {
      throw new BadRequestException('Parâmetro (id) deve ser numérico');
    }

    return this.eventosService.buscarPorId(idNumero);
  }

  @Get(':titulo')
  buscarPorTitulo(@Param('titulo') titulo: string) {
    return this.eventosService.buscarPorTitulo(titulo);
  }

  @Post()
  registrarEvento(@Body() body: CreateEventoDto) {
    return this.eventosService.registrarEvento(body);
  }


  @Patch(':id')
  atualizarParcial(
    @Param('id') id: string,
    @Body() body: UpdateEventoDto,
  ) {
    const idNumero = Number(id);

    if (Number.isNaN(idNumero)) {
      throw new BadRequestException('Parâmetro "id" deve ser numérico');
    }

    return this.eventosService.atualizarParcial(idNumero, body);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    const idNumero = Number(id);

    if (Number.isNaN(idNumero)) {
      throw new BadRequestException('Parâmetro "id" deve ser numérico');
    }

    return this.eventosService.remover(idNumero);
  }
}
