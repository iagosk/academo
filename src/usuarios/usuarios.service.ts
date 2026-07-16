import { Injectable, NotFoundException } from '@nestjs/common';

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  instituicao: string;
  tipo_usuario: 'Admin' | 'Estudante' | 'Professor';
};

@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [
    {
      id: 1,
      nome: 'Administrador',
      email: 'admin@email.com',
      senha: '123456',
      instituicao: 'IFRN',
      tipo_usuario: 'Admin',
    },
    {
      id: 2,
      nome: 'João',
      email: 'joao@email.com',
      senha: '123456',
      instituicao: 'IFRN',
      tipo_usuario: 'Estudante',
    },
  ];

  listarUsuarios() {
    return this.usuarios;
  }

  buscarPorId(id: number) {
    const usuario = this.usuarios.find((u) => u.id === id);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }

  buscarPorEmail(email: string) {
    const usuario = this.usuarios.find((u) => u.email === email);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }

  registrarUsuario(dados: Omit<Usuario, 'id'>) {
    const novoUsuario: Usuario = {
      id: this.usuarios.length + 1,
      ...dados,
    };

    this.usuarios.push(novoUsuario);

    return novoUsuario;
  }

  atualizarParcial(id: number, dados: Partial<Omit<Usuario, 'id'>>) {
    const usuario = this.buscarPorId(id);

    const atualizado = {
      ...usuario,
      ...dados,
    };

    this.usuarios = this.usuarios.map((u) =>
      u.id === id ? atualizado : u,
    );

    return atualizado;
  }

  remover(id: number) {
    this.buscarPorId(id);

    this.usuarios = this.usuarios.filter((u) => u.id !== id);

    return {
      mensagem: `Usuário ${id} removido com sucesso`,
    };
  }
}