import { Injectable, NotFoundException } from '@nestjs/common';

type Atividade = {
  id: number;
  id_evento: number;
  titulo: string;
  descricao: string;
  tipo_atividade: string;
  data_hora: string;
  vagas_totais: number;
  local_especifico: string;
}

@Injectable()
export class AtividadesService {
  private atividades: Atividade[] = [
    { id: 1, id_evento: 1, titulo:"Dinâmica I", descricao: "dsldslkdlkd", tipo_atividade: 'Palestra', data_hora: "01-03-2026 19:00", vagas_totais: 3, local_especifico: "Auditório"},
    { id: 2, id_evento: 1, titulo:"Dinâmica II", descricao: "dsldslkdlkd", tipo_atividade: 'Palestra', data_hora: "01-03-2026 19:00", vagas_totais: 3, local_especifico: "Auditório"},
    { id: 3, id_evento: 1, titulo:"Dinâmica II", descricao: "dsldslkdlkd", tipo_atividade: 'Palestra', data_hora: "01-03-2026 19:00", vagas_totais: 3, local_especifico: "Auditório"},
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
      throw new NotFoundException('Atividade não encontrado!');
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
