import { Controller, Get, Post, Body, Patch, Delete, BadRequestException, Param } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  listarUsuarios(){
    return this.usuariosService.listarUsuarios();
  }

  @Get('buscarPorID/:id')
  buscarPorId(@Param('id') id: string) {
    const idNumero = Number(id);

    if (Number.isNaN(idNumero)) {
      throw new BadRequestException('Parâmetro (id) deve ser numérico');
    }

    return this.usuariosService.buscarPorId(idNumero);
  }

  @Get(':nome')
  buscarPorTitulo(@Param('titulo') nome: string) {
    return this.usuariosService.buscarPorNome(nome);
  }

  @Post()
  registrarUsuario(@Body() body: CreateUsuarioDto) {
    return this.usuariosService.registrarUsuario(body);
  }


  @Patch(':id')
  atualizarParcial(
    @Param('id') id: string,
    @Body() body: UpdateUsuarioDto,
  ) {
    const idNumero = Number(id);

    if (Number.isNaN(idNumero)) {
      throw new BadRequestException('Parâmetro "id" deve ser numérico');
    }

    return this.usuariosService.atualizarParcial(idNumero, body);
  }

  @Post("login")
  login(@Body() body: { email: string; senha: string }) {

    return this.usuariosService.validarLogin(
      body.email,
      body.senha
    );

  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    const idNumero = Number(id);

    if (Number.isNaN(idNumero)) {
      throw new BadRequestException('Parâmetro "id" deve ser numérico');
    }

    return this.usuariosService.remover(idNumero);
  }
}
