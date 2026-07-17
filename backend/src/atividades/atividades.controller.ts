import { Controller, Get, Post, Body, Patch, Delete, BadRequestException, Param } from '@nestjs/common';
import { AtividadesService } from './atividades.service';
import { CreateAtividadeDto } from './dto/create-atividade.dto';
import { UpdateAtividadeDto } from './dto/update-atividade.dto';

@Controller('atividades')
export class AtividadesController {
  constructor(private readonly atividadesService: AtividadesService) { }

  @Get()
  listarAtividades() {
    return this.atividadesService.listarAtividades();
  }

  @Get('buscarPorID/:id')
  buscarPorId(@Param('id') id: string) {
    const idNumero = Number(id);

    if (Number.isNaN(idNumero)) {
      throw new BadRequestException('Parâmetro (id) deve ser numérico');
    }

    return this.atividadesService.buscarPorId(idNumero);
  }

  @Get(':titulo')
  buscarPorTitulo(@Param('titulo') titulo: string) {
    return this.atividadesService.buscarPorTitulo(titulo);
  }

  @Post()
  registrarAtividade(@Body() body: CreateAtividadeDto) {
    return this.atividadesService.registrarAtividade(body);
  }


  @Patch(':id')
  atualizarParcial(
    @Param('id') id: string,
    @Body() body: UpdateAtividadeDto,
  ) {
    const idNumero = Number(id);

    if (Number.isNaN(idNumero)) {
      throw new BadRequestException('Parâmetro "id" deve ser numérico');
    }

    return this.atividadesService.atualizarParcial(idNumero, body);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    const idNumero = Number(id);

    if (Number.isNaN(idNumero)) {
      throw new BadRequestException('Parâmetro "id" deve ser numérico');
    }

    return this.atividadesService.remover(idNumero);
  }
}
