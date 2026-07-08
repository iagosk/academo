import { Module } from '@nestjs/common';
import { EventosController } from './eventos.controller';
import { EventosService } from './eventos.service';

@Module({
  controllers: [EventosController],
  providers: [EventosService]
})
export class EventosModule {}
