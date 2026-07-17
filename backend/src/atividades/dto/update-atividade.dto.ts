import { IsEnum, IsString, IsInt, IsDateString, IsOptional } from 'class-validator';

export enum TipoAtividade {
  Oficina = 'Oficina',
  Palestra = 'Palestra',
  Minicurso = 'Minicurso',
}

export class UpdateAtividadeDto {
  @IsOptional()
  @IsString({ message: 'O título deve ser uma string' })
  titulo?: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  descricao?: string;

  @IsOptional()
  @IsDateString({}, { message: 'A data e hora devem ser válidas (ISO 8601)' })
  data_hora?: string;

  @IsOptional()
  @IsInt({ message: 'As vagas totais devem ser um número inteiro' })
  vagas_totais?: number;

  @IsOptional()
  @IsString({ message: 'O local específico deve ser uma string' })
  local_especifico?: string;

  @IsOptional()
  @IsEnum(TipoAtividade, {
    message: 'O tipo de atividade deve ser Oficina, Palestra ou Minicurso',
  })
  tipo_atividade?: TipoAtividade;
}