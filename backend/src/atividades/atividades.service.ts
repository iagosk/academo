import { Injectable, NotFoundException } from '@nestjs/common';

type Atividade = {
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
export class AtividadesService {
  private atividades: Atividade[] = [
    { id: 1, titulo: "KLS", descricao: "dsddsds", data_inicio: "sdjsdjds", data_fim: "dkdkdk", local: "fdjkdfkd", tipo: "palestra", capacidade: 50 },
    { id: 2, titulo: "KLS", descricao: "dsddsds", data_inicio: "sdjsdjds", data_fim: "dkdkdk", local: "fdjkdfkd", tipo: "oficina", capacidade: 30 },
    { id: 3, titulo: "KLS", descricao: "dsddsds", data_inicio: "sdjsdjds", data_fim: "dkdkdk", local: "fdjkdfkd" }
  ];

  listarAtividades() {
    return this.atividades;
  }

  buscarPorId(id: number) {
    const atividade = this.atividades.find((a) => a.id === id);

    if (!atividade) {
      throw new NotFoundException('Atividade não encontrada!');
    }

    return atividade;
  }

  buscarPorTitulo(titulo: string) {
    const atividade = this.atividades.find((item) => item.titulo === titulo);

    if (!atividade) {
      throw new NotFoundException('Evento não encontrado!');
    }

    return atividade;
  }

  registrarAtividade(dados: Omit<Atividade, 'id'>) {
    const novaAtividade: Atividade = {
      id: this.atividades.length + 1,
      ...dados
    };

    this.atividades.push(novaAtividade);
    return novaAtividade;
  }

  atualizarParcial(id: number, dados: Partial<Omit<Atividade, 'id'>>) {
    const atividade = this.buscarPorId(id);
    const atualizado = { ...atividade, ...dados };

    this.atividades = this.atividades.map((a) => (a.id === id ? atualizado : a));
    return atualizado;
  }

  remover(id: number) {
    const existe = this.atividades.some((e) => e.id === id);

    if (!existe) {
      throw new NotFoundException('Evento não encontrado');
    }

    this.atividades = this.atividades.filter((e) => e.id !== id);
    return { mensagem: `Evento ${id} removido com sucesso` };
  }
}
