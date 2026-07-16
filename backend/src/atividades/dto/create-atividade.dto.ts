import { IsEnum, IsNotEmpty, IsString, IsInt, IsDateString, MaxLength } from 'class-validator';

export enum TipoAtividade {
  Oficina = 'Oficina',
  Palestra = 'Palestra',
  Minicurso = 'Minicurso',
}

export class CreateAtividadeDto {   
  @IsString({ message: 'O título deve ser uma string' })
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @MaxLength(80, { message: 'O título deve ter no máximo 80 caracteres' })
  titulo: string;

  @IsString({ message: 'A descrição deve ser uma string' })
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  descricao: string;

  @IsDateString({}, { message: 'A data e hora devem ser válidas (ISO 8601)' })
  data_hora: string;

  @IsInt({ message: 'As vagas totais devem ser um número inteiro' })
  vagas_totais: number;

  @IsString({ message: 'O local específico deve ser uma string' })
  @MaxLength(80, { message: 'O local específico deve ter no máximo 80 caracteres' })
  local_especifico: string;

  @IsEnum(TipoAtividade, {
    message: 'O tipo de atividade deve ser Oficina, Palestra ou Minicurso',
  })
  @IsNotEmpty({ message: 'O tipo de atividade é obrigatório' })
  tipo_atividade: TipoAtividade;
}