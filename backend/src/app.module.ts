import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventosService } from './eventos/eventos.service';
import { EventosModule } from './eventos/eventos.module';

@Module({
  imports: [EventosModule],
  controllers: [AppController],
  providers: [AppService, EventosService],
})
export class AppModule {}
