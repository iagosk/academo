import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(50, { message: 'O nome deve ter no máximo 50 caracteres' })
  nome!: string;

  @IsEmail({}, { message: 'Informe um e-mail válido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @MaxLength(80, { message: 'O e-mail deve ter no máximo 80 caracteres' })
  email!: string;

  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MaxLength(50, { message: 'A senha deve ter no máximo 50 caracteres' })
  senha!: string;

  @IsString({ message: 'A instituição deve ser uma string' })
  @IsNotEmpty({ message: 'A instituição é obrigatória' })
  @MaxLength(80, { message: 'A instituição deve ter no máximo 80 caracteres' })
  instituicao!: string;
}