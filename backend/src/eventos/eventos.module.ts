// eventos.module.ts
import { Module } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { UsuariosModule } from '../usuarios/usuarios.module'; // Importe o módulo aqui

@Module({
  imports: [UsuariosModule],
  controllers: [EventosController],
  providers: [EventosService],
})
export class EventosModule { }