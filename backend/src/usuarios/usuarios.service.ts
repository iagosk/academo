import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

type Usuario = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  instituicao: string;
}

@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [
    { id: 1, nome: "João Paulo", email: "jp@email.com", senha: "1234", instituicao: "EEQS"},
    { id: 2, nome: "Maria Eduarda", email: "maria@email.com", senha: "123456", instituicao: "IFRN"},
    { id: 3, nome: "José Anderson", email: "jose@email.com", senha: "12345678910", instituicao: "EEQS"}
  ];

  listarUsuarios() {
    return this.usuarios;
  }

  buscarPorId(id: number) {
    const usuario = this.usuarios.find((e) => e.id === id);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return usuario;
  }

  buscarPorNome(nome: string) {
    const usuario = this.usuarios.find((item) => item.nome === nome);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return usuario;
  }

  registrarUsuario(dados: Omit<CreateUsuarioDto, 'id'>) {
    const novoUsuario: Usuario = {
      id: this.usuarios.length + 1,
      ...dados
    };

    this.usuarios.push(novoUsuario);
    return novoUsuario;
  }

  atualizarParcial(id: number, dados: Partial<Omit<UpdateUsuarioDto, 'id'>>) {
    const usuario = this.buscarPorId(id);
    const atualizado = { ...usuario, ...dados };

    this.usuarios = this.usuarios.map((u) => (u.id === id ? atualizado : u));
    return atualizado;
  }

  validarLogin(email: string, senha: string) {

    const usuario = this.usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (!usuario) {
      throw new NotFoundException("E-mail ou senha inválidos.");
    }

    return {
      mensagem: "Login realizado com sucesso.",
      usuario
    };

  }

  remover(id: number) {
    const existe = this.usuarios.some((u) => u.id === id);

    if (!existe) {
      throw new NotFoundException('Usuário não encontrado');
    }

    this.usuarios = this.usuarios.filter((u) => u.id !== id);
    return { mensagem: `Usuário ${id} removido com sucesso` };
  }
}

