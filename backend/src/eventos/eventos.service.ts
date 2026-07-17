import { Injectable, NotFoundException } from '@nestjs/common';

type Evento = {
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
export class EventosService {
  private eventos : Evento[] = [
    { id: 1, titulo: "Seminário de Integração", descricao: "Seminário voltado para os estudantes calouros", data_inicio: "01/04/2026", data_fim: "02/06/2026", local: "Auditório", tipo: "palestra", capacidade: 50 },
    {id: 2, titulo: "Programa PartiuIF", descricao: "Apresentação voltada ao programa.", data_inicio: "05/06/2026", data_fim: "06/06/2026", local: "Ginásio", tipo: "oficina", capacidade: 30},
    { id: 3, titulo: "Apresentação do Projeto Mulheres Mil", descricao: "Palestra do Projeto", data_inicio: "12/06/2026", data_fim: "12/06/2026", local: "Auditório" }
  ];

  listarEventos() {
    return this.eventos;
  }

  buscarPorId(id: number) {
    const evento = this.eventos.find((e) => e.id === id);

    if (!evento) {
      throw new NotFoundException('Evento não encontrado!');
    }

    return evento;
  }

  buscarPorTitulo(titulo: string) {
    const evento = this.eventos.find((item) => item.titulo === titulo);

    if (!evento) {
      throw new NotFoundException('Evento não encontrado!');
    }

    return evento;
  }

  registrarEvento(dados: Omit<Evento, 'id'>) {
    const novoEvento: Evento = {
      id: this.eventos.length + 1, 
      ...dados
    };

    this.eventos.push(novoEvento);
    return novoEvento;
  }

  atualizarParcial(id: number, dados: Partial<Omit<Evento, 'id'>>) {
    const evento = this.buscarPorId(id);
    const atualizado = { ...evento, ...dados };

    this.eventos = this.eventos.map((e) => (e.id === id ? atualizado : e));
    return atualizado;
  }

  remover(id: number) {
    const existe = this.eventos.some((e) => e.id === id);

    if (!existe) {
      throw new NotFoundException('Evento não encontrado');
    }

    this.eventos = this.eventos.filter((e) => e.id !== id);
    return { mensagem: `Evento ${id} removido com sucesso` };
  }
}
