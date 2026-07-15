import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Module({
  providers: [UsuariosService]
})
export class UsuariosModule {}
