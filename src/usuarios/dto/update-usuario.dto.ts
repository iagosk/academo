import { IsEmail, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { TipoUsuario } from './create-usuario.dto';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  @MaxLength(50, { message: 'O nome deve ter no máximo 50 caracteres' })
  nome?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  @MaxLength(80, { message: 'O e-mail deve ter no máximo 80 caracteres' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'A senha deve ser uma string' })
  @MaxLength(50, { message: 'A senha deve ter no máximo 50 caracteres' })
  senha?: string;

  @IsOptional()
  @IsString({ message: 'A instituição deve ser uma string' })
  @MaxLength(80, { message: 'A instituição deve ter no máximo 80 caracteres' })
  instituicao?: string;

  @IsOptional()
  @IsEnum(TipoUsuario, {
    message: 'O tipo de usuário deve ser Admin, Estudante ou Professor',
  })
  tipo_usuario?: TipoUsuario;
}