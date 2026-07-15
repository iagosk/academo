import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventosService } from './eventos/eventos.service';
import { EventosModule } from './eventos/eventos.module';
import { EventosController } from './eventos/eventos.controller';
import { UsuariosController } from './usuarios/usuarios.controller';
import { UsuariosModule } from './usuarios/usuarios.module';
import { UsuariosService } from './usuarios/usuarios.service';

@Module({
  imports: [EventosModule, UsuariosModule],
  controllers: [AppController, UsuariosController, EventosController],
  providers: [AppService, UsuariosService, EventosService],
})
export class AppModule {}
