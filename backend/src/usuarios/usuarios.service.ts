import { Injectable, NotFoundException } from '@nestjs/common';

type Usuario = {
  id: number;
  titulo: string;
  descricao: string;
  data_inicio: string;
  data_fim: string;
  local: string;
  tipo?: string;
  capacidade?: number;
}

@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [
    { id: 1, titulo: "KLS", descricao: "dsddsds", data_inicio: "sdjsdjds", data_fim: "dkdkdk", local: "fdjkdfkd", tipo: "palestra", capacidade: 50 },
    { id: 2, titulo: "KLS", descricao: "dsddsds", data_inicio: "sdjsdjds", data_fim: "dkdkdk", local: "fdjkdfkd", tipo: "oficina", capacidade: 30 },
    { id: 3, titulo: "KLS", descricao: "dsddsds", data_inicio: "sdjsdjds", data_fim: "dkdkdk", local: "fdjkdfkd" }
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

  buscarPorTitulo(titulo: string) {
    const usuario = this.usuarios.find((item) => item.titulo === titulo);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return usuario;
  }

  registrarUsuario(dados: Omit<Usuario, 'id'>) {
    const novoUsuario: Usuario = {
      id: this.usuarios.length + 1,
      ...dados
    };

    this.usuarios.push(novoUsuario);
    return novoUsuario;
  }

  atualizarParcial(id: number, dados: Partial<Omit<Usuario, 'id'>>) {
    const usuario = this.buscarPorId(id);
    const atualizado = { ...usuario, ...dados };

    this.usuarios = this.usuarios.map((u) => (u.id === id ? atualizado : u));
    return atualizado;
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

