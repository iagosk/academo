import { IsString, IsOptional, IsInt, Min, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateEventoDto {
  @IsOptional()
  @IsInt({ message: 'O id deve ser um número inteiro' })
  id?: number;

  @IsOptional()
  @IsString({ message: 'O título deve ser uma string' })
  titulo?: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  descricao?: string;

  @IsOptional()
  @IsDateString({}, { message: 'A data de início deve ser uma data válida (ISO 8601)' })
  data_inicio?: string;

  @IsOptional()
  @IsDateString({}, { message: 'A data de fim deve ser uma data válida (ISO 8601)' })
  data_fim?: string;

  @IsOptional()
  @IsString({ message: 'O local deve ser uma string' })
  local?: string;

  @IsOptional()
  @IsString({ message: 'O tipo deve ser uma string' })
  tipo?: string;

  @IsOptional()
  @IsInt({ message: 'A capacidade deve ser um número inteiro' })
  @Min(1, { message: 'A capacidade deve ser no mínimo 1' })
  @Transform(({ value }) => (value ? Number(value) : value))
  capacidade?: number;
}
