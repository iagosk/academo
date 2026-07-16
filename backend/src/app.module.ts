import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventosService } from './eventos/eventos.service';
import { EventosModule } from './eventos/eventos.module';
import { EventosController } from './eventos/eventos.controller';
import { UsuariosController } from './usuarios/usuarios.controller';
import { UsuariosModule } from './usuarios/usuarios.module';
import { UsuariosService } from './usuarios/usuarios.service';
import { AtividadesController } from './atividades/atividades.controller';
import { AtividadesModule } from './atividades/atividades.module';
import { AtividadesService } from './atividades/atividades.service';

@Module({
  imports: [EventosModule, UsuariosModule, AtividadesModule],
  controllers: [AppController, UsuariosController, EventosController, AtividadesController],
  providers: [AppService, UsuariosService, EventosService, AtividadesService],
})
export class AppModule {}
