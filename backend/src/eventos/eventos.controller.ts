import { Controller, Get, Post, Body, Patch, Delete, BadRequestException, Param } from '@nestjs/common';
import { EventosService } from './eventos.service';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Get()
  listarEventos(){
    return this.eventosService.listarEventos();
  }

  @Get(':titulo')
  buscarPorTitulo(@Param('titulo') titulo: string) {
    return this.eventosService.buscarPorTitulo(titulo);
  }

  @Get('buscarPorID/:id')
  buscarPorId(@Param('id') id: string) {
    const idNumero = Number(id);

    if (Number.isNaN(idNumero)) {
      throw new BadRequestException('Parâmetro (id) deve ser numérico');
    }

    return this.eventosService.buscarPorId(idNumero);
  }

  @Post()
  registrarEvento(
    @Body()
    body: {
      titulo: string;
      descricao: string;
      data_inicio: string;
      data_fim: string;
      local: string;
    },
  ) {
    if (!body.titulo || !body.descricao || !body.data_inicio || !body.data_fim || !body.local) {
      throw new BadRequestException("Preencha todos os campos obrigatórios!");
    }

    return this.eventosService.registrarEvento(body);
  }


  @Patch(':id')
  atualizarParcial(
    @Param('id') id: string,
    @Body()
    body: {
      titulo: string;
      descricao: string;
      data_inicio: string;
      data_fim: string;
      local: string;
    },
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
