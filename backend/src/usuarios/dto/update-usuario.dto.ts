import { IsString, IsOptional, IsEmail, MinLength } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  nome?: string;

  @IsOptional()
  @IsEmail({}, { message: 'O email deve ser um email válido' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'A senha deve ser uma string' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  senha?: string;

  @IsOptional()
  @IsString({ message: 'O telefone deve ser uma string' })
  telefone?: string;

  @IsOptional()
  @IsString({ message: 'O tipo deve ser uma string' })
  tipo?: string;
}