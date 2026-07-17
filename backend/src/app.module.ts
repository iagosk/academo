import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventosModule } from './eventos/eventos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AtividadesModule } from './atividades/atividades.module';

@Module({
  imports: [
    EventosModule,
    UsuariosModule,
    AtividadesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }