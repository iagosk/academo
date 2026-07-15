import { IsString, IsNotEmpty, IsOptional, IsInt, Min, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateEventoDto {
  @IsString({ message: 'O título deve ser uma string' })
  @IsNotEmpty({ message: 'O título é obrigatório' })
  titulo: string;

  @IsString({ message: 'A descrição deve ser uma string' })
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  descricao: string;

  @IsDateString({}, { message: 'A data de início deve ser uma data válida (ISO 8601)' })
  @IsNotEmpty({ message: 'A data de início é obrigatória' })
  data_inicio: string;

  @IsDateString({}, { message: 'A data de fim deve ser uma data válida (ISO 8601)' })
  @IsNotEmpty({ message: 'A data de fim é obrigatória' })
  data_fim: string;

  @IsString({ message: 'O local deve ser uma string' })
  @IsNotEmpty({ message: 'O local é obrigatório' })
  local: string;

  @IsOptional()
  @IsString({ message: 'O tipo deve ser uma string' })
  tipo?: string;

  @IsOptional()
  @IsInt({ message: 'A capacidade deve ser um número inteiro' })
  @Min(1, { message: 'A capacidade deve ser no mínimo 1' })
  @Transform(({ value }) => (value ? Number(value) : value))
  capacidade?: number;
}
